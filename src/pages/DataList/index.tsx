import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";
import { Paper, Button, Typography, Breadcrumbs } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import { useUsers } from '@/hooks/useUsers';
import columns from './ColumnsGrid';
import Header from '@/components/header';
import { useUserContext } from '@/context/userContext';

export const DataList = () => {
    const paginationModel = { page: 0, pageSize: 5 };
    const navigate = useNavigate();
    const { users } = useUsers();
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
                <div className='bg-[#00876E] p-4' role="presentation">
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link
                            className="text-white"
                            to="/home"
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
