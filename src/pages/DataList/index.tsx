/* eslint-disable react-hooks/rules-of-hooks */
import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { useState } from 'react';
import { DataGrid, GridColDef, GridValueFormatterParams } from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import ChatIcon from '@mui/icons-material/Chat';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useUsers } from '@/hooks/useUsers';
import Header from '@/components/header';
import { User } from "@/types/user";
import { useUserContext } from '@/context/userContext';

type DateFormatterParams = GridValueFormatterParams<string | null>;

const dateFormatter = (params: DateFormatterParams) => {
    const formatterDate = params
        ? new Date(params).toLocaleDateString('pt-BR')
        : '-';

    return formatterDate;
}

const columns: GridColDef[] = [
    { field: 'id', headerName: 'Código', width: 200 },
    { field: 'nome', headerName: 'Nome', width: 300 },
    {
        field: 'dataInicial',
        headerName: 'Data Inicial',
        width: 200,
        valueFormatter: dateFormatter,
    },
    {
        field: 'dataFinal',
        headerName: 'Data Final',
        type: 'number',
        width: 200,
        valueFormatter: dateFormatter,
    },
    {
        field: 'propriedades',
        headerName: 'Propriedade(s)',
        sortable: false,
        width: 200,
        valueFormatter: (params) => {
            const labId = params || params;

            const propriedadesMap: Record<number, string> = {
                1: 'Fazenda Agrotis',
                2: 'Fazenda Wohirish',
                3: 'Fazenda Zeimninoa',
                4: 'Fazenda Veavaounn',
                5: 'Fazenda Nyugebor'
            };

            return propriedadesMap[labId] || 'Laboratório desconhecido';
        },
    },
    {
        field: 'laboratorio',
        headerName: 'Laboratório',
        width: 200,
        valueFormatter: (params) => {
            const labId = params || params;

            const laboratoriosMap: Record<number, string> = {
                1: 'Agro Skynet',
                2: 'Umbrella Agro',
                3: 'Osborne Agro',
                4: 'Skyrim Agro',
                5: 'Agro Brasil'
            };

            return laboratoriosMap[labId] || 'Laboratório desconhecido';
        },
    },
    {
        field: 'observacoes',
        headerName: 'Obs.',
        width: 200,
        renderCell: () => (
            <ChatIcon />
        ),
    },
    {
        field: 'acoes',
        headerName: 'Ações',
        width: 100,
        sortable: false,
        filterable: false,
        editable: false,
        renderCell: (params) => {
            const { setCurrentUser, setIsEditMode } = useUserContext();
            const {
                deleteUser,
            } = useUsers();
            const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
            const navigate = useNavigate();
            const open = Boolean(anchorEl);

            const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
                event.stopPropagation();
                setAnchorEl(event.currentTarget);
            };

            const handleClose = (event: React.MouseEvent) => {
                event.stopPropagation();
                setAnchorEl(null);
            };

            const handleEdit = (event: React.MouseEvent) => {
                handleClose(event);
                setCurrentUser(params.row as User);
                setIsEditMode(true);
                navigate("/cadastro");
            };

            const handleDelete = (event: React.MouseEvent) => {
                handleClose(event);
                deleteUser(params.row.id);
            };

            return (
                <div>
                    <Tooltip title="Opções">
                        <IconButton
                            aria-label="more"
                            aria-controls={open ? 'options-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={handleClick}
                            size="small"
                        >
                            <MoreHoriz />
                        </IconButton>
                    </Tooltip>

                    <Menu
                        id="options-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'options-button',
                        }}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        <MenuItem onClick={handleEdit}>Editar</MenuItem>
                        <MenuItem onClick={handleDelete}>Excluir</MenuItem>
                    </Menu>
                </div>
            );
        },
    }
];

const paginationModel = { page: 0, pageSize: 5 };

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
}

export const DataList = () => {
    const navigate = useNavigate();
    const {
        users,
    } = useUsers();
    const { setCurrentUser, setIsEditMode } = useUserContext()


    const handleAddAction = () => {
        setIsEditMode(false);
        setCurrentUser(null);
        navigate("/cadastro");
    }

    return (
        <div className='mx-auto min-h-screen flex flex-col bg-[#F5F5F5]'>
            <Header />

            <div className='flex flex-col p-[7rem]'>
                <div className='bg-[#00876E] p-4' role="presentation" onClick={handleClick}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link
                            underline="hover"
                            color="white"
                            href="/material-ui/getting-started/installation/"
                        >
                            Início
                        </Link>
                        <Typography color="white">Teste Front-end</Typography>
                    </Breadcrumbs>
                </div>

                <div className="card">
                    <div className='flex items-center gap-5 p-[1rem] bg-white'>
                        <div>Registros ({users?.length})</div>
                        <Button variant="outlined" startIcon={<AddIcon />} onClick={handleAddAction}>
                            Adicionar
                        </Button>
                    </div>
                    <Paper sx={{ height: 400, width: '100%', padding: '1rem' }}>
                        <DataGrid
                            rows={users}
                            columns={columns}
                            disableColumnMenu
                            initialState={{ pagination: { paginationModel } }}
                            pageSizeOptions={[5, 10]}
                            sx={{ border: 0 }}
                        />
                    </Paper>
                </div>

            </div>
        </div >
    )
}

export default DataList;
