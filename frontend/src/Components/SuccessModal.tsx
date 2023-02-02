import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface ModalPropTypes {
    shortUrl: string;
}

function SuccessModal(props: ModalPropTypes) {
    const { shortUrl } = props;
    const [open, setOpen] = useState(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <h3>Success!</h3>
                    <Typography id="modal-modal-description" >
                        Your short url:
                    </Typography>
                    <TextField
                        type='text'
                        defaultValue={shortUrl}
                        variant='outlined'
                        inputProps={
                            { readOnly: true, }
                        }
                        fullWidth
                    />
                </Box>
            </Modal>
        </div >
    );
}
export default SuccessModal;