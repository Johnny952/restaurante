import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";

interface DeleteMapDialogProps {
    open: boolean;
    handleClose: () => void;
    handleConfirmDeleteMap: () => void;
}

export default function DeleteMapDialog({
    open,
    handleClose,
    handleConfirmDeleteMap,
}: DeleteMapDialogProps) {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Eliminar mapa"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    ¿Está seguro/a de eliminar este mapa?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button onClick={handleConfirmDeleteMap} autoFocus>
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    );
}
