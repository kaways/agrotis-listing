import { useState } from 'react';
import ChatIcon from '@mui/icons-material/Chat';
import { Box, IconButton, Modal, Typography } from '@mui/material';

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    pb: 6,
    boxShadow: 24,
    borderRadius: 1,
};

interface ObservationModalProps {
    observationData: string | undefined;
}

export const ObservationModal = ({ observationData }: ObservationModalProps) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <IconButton onClick={handleOpen}>
                <ChatIcon />
            </IconButton>

            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>
                    <div className='bg-[#00876E] p-4'>
                        <Typography variant="h6" component="h2" color="white" >
                            Observações
                        </Typography>
                    </div>
                    <Typography sx={{ mt: 2, p: 2, pt: 4, pb: 4 }}>
                        {observationData || "Nenhuma observação cadastrada."}
                    </Typography>
                </Box>
            </Modal>
        </>
    );
};

export default ObservationModalProps;
