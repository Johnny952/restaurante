import { updateNameLink } from "@/app/api/dishes/update";
import toKebabCase from "@/helpers/to-kebab-case";
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
    const [linkValue, setLinkValue] = useState("");
    const setLoading = useLoadStore((state) => state.setLoading);
    const snackSuccess = useSnackStore((state) => state.setOpenSuccess);
    const snackError = useSnackStore((state) => state.setOpenError);

    function onNameValueChange(
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        setNameValue(event.target.value);
        setLinkValue(toKebabCase(event.target.value));
    }

    async function onConfirmName() {
        setLoading(true);
        try {
            await updateNameLink(id, nameValue, linkValue);
            snackSuccess("Nombre de plato cambiado");
            setNameValue("");
            setLinkValue("");
            onClose();
        } catch (error) {
            snackError(`Ocurrió un error: ${error}`);
        }
        setLoading(false);
    }

    return (
        <Dialog open={open} aria-labelledby="edit-dialog-title">
            <DialogTitle id="edit-dialog-title">Editar nombre/link</DialogTitle>
            <DialogContent>
                <TextField
                    label="Nuevo Nombre"
                    variant="standard"
                    value={nameValue}
                    name="name"
                    onChange={onNameValueChange}
                    fullWidth
                    required
                />
                <TextField
                    label="Link"
                    variant="standard"
                    value={linkValue}
                    disabled
                    fullWidth
                    required
                />
                <DialogActions>
                    <Button
                        onClick={() => {
                            setNameValue("");
                            setLinkValue("");
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
                        disabled={nameValue === "" || linkValue === ""}
                    >
                        Confirmar
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
}
