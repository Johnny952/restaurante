import toKebabCase from "@/helpers/to-kebab-case";
import { updateNameLink } from "@/lib/services/category";
import useLoadStore from "@/store/load-store";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { ChangeEvent, useState } from "react";

export default function EditNameDialog({
    open,
    id,
}: {
    open: boolean;
    id: string;
}) {
    const [nameValue, setNameValue] = useState("");
    const [linkValue, setLinkValue] = useState("");
    const setLoading = useLoadStore((state) => state.setLoading);
    const router = useRouter();

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
            enqueueSnackbar({
                message: "Nombre de categoría cambiado",
                variant: "success",
                autoHideDuration: 3000,
            });
            setNameValue("");
            setLinkValue("");
            router.refresh();
            router.push("editar");
        } catch (error) {
            enqueueSnackbar({
                message: `Ocurrio un error: ${error}`,
                variant: "error",
                autoHideDuration: 3000,
            });
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
                            router.push("editar");
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
