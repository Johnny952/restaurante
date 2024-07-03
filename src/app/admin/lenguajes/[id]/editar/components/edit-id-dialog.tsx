import { updateID } from "@/app/api/languages/update";
import useLoadStore from "@/store/load-store";
import useSnackStore from "@/store/snackbar-store";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@mui/material";
import { ChangeEvent, useState } from "react";

export default function EditIDDialog({
    open,
    id,
    onClose,
}: {
    open: boolean;
    id: string;
    onClose: (newId: string) => void;
}) {
    const [idValue, setIdValue] = useState("");
    const setLoading = useLoadStore((state) => state.setLoading);
    const snackSuccess = useSnackStore((state) => state.setOpenSuccess);
    const snackError = useSnackStore((state) => state.setOpenError);

    function onIdValueChange(
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        setIdValue(event.target.value);
    }

    async function onConfirmName() {
        setLoading(true);
        try {
            await updateID(id, idValue);
            snackSuccess("ID de Lenguage cambiado");
            setIdValue("");
            onClose(idValue);
        } catch (error) {
            snackError(`Ocurrió un error: ${error}`);
        }
        setLoading(false);
    }

    return (
        <Dialog open={open} aria-labelledby="edit-dialog-title">
            <DialogTitle id="edit-dialog-title">Editar ID</DialogTitle>
            <DialogContent>
                <TextField
                    label="Nuevo ID"
                    variant="standard"
                    value={idValue}
                    onChange={onIdValueChange}
                    fullWidth
                    required
                />
                <DialogActions>
                    <Button
                        onClick={() => {
                            setIdValue("");
                            onClose(id);
                        }}
                        color="error"
                        autoFocus
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={onConfirmName}
                        autoFocus
                        disabled={idValue === ""}
                    >
                        Confirmar
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
}
