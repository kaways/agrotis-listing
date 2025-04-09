/* eslint-disable react-hooks/rules-of-hooks */

import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { useState } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import ChatIcon from '@mui/icons-material/Chat';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import { User } from "@/types/user";
import { useUsers } from '@/hooks/useUsers';
import { useNavigate } from "react-router-dom";
import { useUserContext } from '@/context/userContext';

const dateFormatter = (params: string | number) => {
    const formatterDate = params
        ? new Date(params).toLocaleDateString('pt-BR')
        : '-';

    return formatterDate;
}


export const ColumnsGrid: GridColDef[] = [
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

export default ColumnsGrid;