import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { userFormSchema, UserFormValues } from '@/types/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { useUsers } from '@/hooks/useUsers';
import CircularProgress from '@mui/material/CircularProgress';
import { fetchPropriedades, fetchLaboratorios } from '@/services/api';
import { ptBR } from 'date-fns/locale/pt-BR';

import {
    TextField,
    Button,
    MenuItem,
    Grid,
} from '@mui/material';

interface UserFormProps {
    onSubmit: (values: UserFormValues) => void;
    defaultValues?: UserFormValues | null;
    isSubmitting?: boolean;
    isEdit?: boolean;
}

export const RegisterForm = ({
    onSubmit,
    defaultValues,
    isEdit = false,
}: UserFormProps) => {
    const {
        handleSubmit,
        getValues,
        control,
        formState: { errors },
    } = useForm<UserFormValues>({
        resolver: zodResolver(userFormSchema),
        defaultValues: defaultValues || {
            nome: "",
            dataInicial: "",
            dataFinal: "",
            propriedades: 0,
            laboratorio: 0,
            observacoes: "",
        }
    });

    interface Propriedade {
        id: number;
        nome: string;
        cnpj: string;
    }

    interface Laboratorio {
        id: number;
        nome: string;
    }

    const [propriedadesOptions, setPropriedadesOptions] = useState<Propriedade[]>([]);
    const [laboratorioOptions, setLaboratorioOptions] = useState<Laboratorio[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadPropriedades = async () => {
            try {
                setLoading(true);
                setError(null);

                const propriedades = await fetchPropriedades();
                setPropriedadesOptions(propriedades);

            } catch (err) {
                console.error('Erro ao carregar propriedades:', err);
                setError('Falha ao carregar propriedades');
                setPropriedadesOptions([]); 
            } finally {
                setLoading(false);
            }
        };

        loadPropriedades();
    }, []);

    useEffect(() => {
        const loadLaboratorio = async () => {
            try {
                setLoading(true);
                setError(null);

                const propriedades = await fetchLaboratorios();
                setLaboratorioOptions(propriedades);

            } catch (err) {
                console.error('Erro ao carregar propriedades:', err);
                setError('Falha ao carregar propriedades');
                setLaboratorioOptions([]); 
            } finally {
                setLoading(false);
            }
        };

        loadLaboratorio();
    }, []);

    const {
        updateUser,
    } = useUsers();

    const handleSubmitForm = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEdit && defaultValues) {
            const formValues = getValues();
            updateUser(formValues);
            handleSubmit(onSubmit)();
        } else
            handleSubmit(onSubmit)();
    };

    if (loading) return <div><CircularProgress color="inherit" /></div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>

            <form onSubmit={handleSubmitForm}>
                <Grid className="flex flex-col gap-5 bg-white p-10">
                    <Grid className="flex gap-5 mt-5" >
                        <Grid className="flex w-1/2" >
                            {/* Campo: Nome */}
                            <Controller
                                name="nome"
                                control={control}
                                rules={{ required: 'Nome é obrigatório' }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Nome *"
                                        variant="outlined"
                                        fullWidth
                                        error={!!errors.nome}
                                        helperText={errors.nome?.message}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid className="flex w-1/2 gap-5" >
                            {/* Campo: Data Inicial */}
                            <Controller
                                name="dataInicial"
                                control={control}
                                rules={{ required: 'Data inicial é obrigatória' }}
                                render={({ field }) => (
                                    <DatePicker
                                        {...field}
                                        label="Data Inicial *"
                                        format="dd/MM/yyyy"
                                        value={field.value ? new Date(field.value) : null}
                                        onChange={(date) => field.onChange(date?.toISOString())}
                                        slotProps={{
                                            textField: {
                                                error: !!errors.dataInicial,
                                                helperText: errors.dataInicial?.message,
                                            },
                                        }}
                                    />
                                )}
                            />

                            {/* Campo: Data Final */}
                            <Controller
                                name="dataFinal"
                                control={control}
                                rules={{ required: 'Data final é obrigatória' }}
                                render={({ field }) => (
                                    <DatePicker
                                        {...field}
                                        label="Data Final *"
                                        format="dd/MM/yyyy"
                                        value={field.value ? new Date(field.value) : null}
                                        onChange={(date) => field.onChange(date?.toISOString())}
                                        slotProps={{
                                            textField: {
                                                error: !!errors.dataFinal,
                                                helperText: errors.dataFinal?.message,
                                                fullWidth: true,
                                            },
                                        }}
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>


                    {/* Campo: Propriedades */}
                    <Grid className="flex gap-5">
                        <Grid className="flex w-1/2" >
                            <Controller
                                name="propriedades"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        select
                                        label="Propriedades *"
                                        variant="outlined"
                                        value={field.value}
                                        onChange={(e) => field.onChange(e.target.value)}
                                        error={!!errors.propriedades}
                                        helperText={errors.propriedades?.message}
                                    >
                                        {propriedadesOptions?.map((option) => (
                                            <MenuItem key={option.id} value={option.id}>
                                                {option.nome}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                )}
                            />
                        </Grid>

                        {/* Campo: Laboratório */}
                        <Grid className="flex w-1/2" >
                            <Controller
                                name="laboratorio"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        select
                                        label="Laboratório *"
                                        variant="outlined"
                                        value={field.value || {}}
                                        onChange={(e) => field.onChange(e.target.value)}
                                        error={!!errors.laboratorio}
                                        helperText={errors.laboratorio?.message}
                                    >
                                        {laboratorioOptions.map((option) => (
                                            <MenuItem key={option.id} value={option.id}>
                                                {option.nome}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                )}
                            />
                        </Grid>
                    </Grid>

                    {/* Campo: Observações */}
                    <Grid>
                        <Controller
                            name="observacoes"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Observações"
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    error={!!errors.observacoes}
                                    helperText={errors.observacoes?.message}
                                />
                            )}
                        />
                    </Grid>

                    <Grid>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="large"
                        >
                            {isEdit ? 'Atualizar' : 'Salvar'}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </LocalizationProvider>

    );
};

export default RegisterForm;