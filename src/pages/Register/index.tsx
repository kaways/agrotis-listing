import { useState } from 'react';
import { User, UserFormValues } from '@/types/user';
import { RegisterForm } from "./RegisterForm";
import { Header } from "@/components/header";
import { Link } from 'react-router-dom';
import { useUsers } from '@/hooks/useUsers';
import { Breadcrumbs, Typography,  Snackbar, Alert, AlertColor } from '@mui/material';
import { useUserContext } from '@/context/userContext';
import { useNavigate } from "react-router-dom";

export const RegisterPage = () => {
    const navigate = useNavigate();
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success' as AlertColor
    });

    const { currentUser, isEditMode } = useUserContext();
    const {
        addUser,
    } = useUsers();

    const handleSubmitUser = async (values: UserFormValues | User) => {
        if (!isEditMode)
            addUser(values);

        setSnackbar({
            open: true,
            message: !isEditMode ? 'Cadastro realizado com sucesso!' : 'Alterações salvas com sucesso!',
            severity: 'success'
        });
        navigate("/listagem");
    }

    const handleCloseSnackbar = () => {
        setSnackbar(prev => ({ ...prev, open: false }));
    };

    return (
        <div className="mx-auto min-h-screen flex flex-col bg-[#F5F5F5]">
            <Header />

            <div className='flex flex-col m-[2rem]'>
                <div className='bg-[#00876E] p-4' role="presentation">
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link
                            className="text-white"
                            to="/listagem"
                        >
                            Teste Front-end
                        </Link>
                        <Typography color="white">Novo Cadastro</Typography>
                    </Breadcrumbs>
                </div>

                <RegisterForm
                    onSubmit={handleSubmitUser}
                    defaultValues={currentUser}
                    isEdit={isEditMode}
                />

                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    <Alert
                        onClose={handleCloseSnackbar}
                        severity={snackbar.severity}
                        sx={{ width: '100%' }}
                    >
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            </div>
        </div >
    );
};

export default RegisterPage;