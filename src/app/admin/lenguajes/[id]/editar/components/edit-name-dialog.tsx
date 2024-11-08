//import { updateName } from "@/app/api/languages/update";
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

export default function EditNameDialog({
    open,
    id,
    onClose,
}: {
    open: boolean;
    id: string;
    onClose: () => void;
}) {
    const [nameValue, setNameValue] = useState("");
    const setLoading = useLoadStore((state) => state.setLoading);
    const snackSuccess = useSnackStore((state) => state.setOpenSuccess);
    const snackError = useSnackStore((state) => state.setOpenError);

    function onNameValueChange(
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        setNameValue(event.target.value);
    }

    async function onConfirmName() {
        setLoading(true);
        try {
            //await updateName(id, nameValue);
            snackSuccess("Nombre de Lenguage cambiado");
            setNameValue("");
            onClose();
        } catch (error) {
            snackError(`Ocurrió un error: ${error}`);
        }
        setLoading(false);
    }

    return (
        <Dialog open={open} aria-labelledby="edit-dialog-title">
            <DialogTitle id="edit-dialog-title">Editar nombre</DialogTitle>
            <DialogContent>
                <TextField
                    label="Nuevo Nombre"
                    variant="standard"
                    value={nameValue}
                    onChange={onNameValueChange}
                    fullWidth
                    required
                />
                <DialogActions>
                    <Button
                        onClick={() => {
                            setNameValue("");
                            onClose();
                        }}
                        color="error"
                        autoFocus
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={onConfirmName}
                        autoFocus
                        disabled={nameValue === ""}
                    >
                        Confirmar
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
}
