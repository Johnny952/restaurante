import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import toKebabCase from "@/helpers/to-kebab-case";
import Uploader from "./uploader";
import useLoadStore from "@/store/load-store";
import useSnackStore from "@/store/snackbar-store";
import { putRestaurante } from "@/app/api/restaurantes/put-restaurante";
import { PutBlobResult } from "@vercel/blob";
import { putImage } from "@/app/api/upload/put-image";

export default function AddRestauranteDialog({
    onClose,
    open,
}: {
    onClose: () => void;
    open: boolean;
}) {
    const [nameValue, setNameValue] = useState("");
    const [linkValue, setLinkValue] = useState("");
    const [logoValue, setLogoValue] = useState("");
    const [file, setfile] = useState<File | null>(null);

    function onNameValueChange(
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        setNameValue(event.target.value);
        setLinkValue(toKebabCase(event.target.value));
    }
    const setLoading = useLoadStore((state) => state.setLoading);
    const snackSuccess = useSnackStore((state) => state.setOpenSuccess);
    const snackError = useSnackStore((state) => state.setOpenError);

    async function onConfirmAdd() {
        if (file) {
            setLoading(true);
            try {

                const url = await putImage(file, `restaurante/${linkValue}/logo.png`);

                if (url === null) {
                    throw Error('La imagen no tiene enlace')
                }
                await putRestaurante(nameValue, linkValue, url);
                onClose();
                setLogoValue("");
                setNameValue("");
                setLinkValue("");
                setfile(null);
                snackSuccess("Restaurante creado");
            } catch (error) {
                snackError(`Ocurrió un error: ${error}`);
            }
            setLoading(false);
        } else {
            snackError('Ninguna imagen seleccionada');
        }
    }

    return (
        <Dialog open={open} aria-labelledby="add-dialog-title">
            <DialogTitle id="add-dialog-title">
                {"Agregar nuevo restaurante"}
            </DialogTitle>
            <DialogContent>
                <TextField
                    label="Nombre"
                    variant="standard"
                    value={nameValue}
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
                <Uploader
                    linkValue={linkValue}
                    setLogoValue={setLogoValue}
                    logoValue={logoValue}
                    setFile={setfile}
                />
                <DialogActions>
                    <Button onClick={onClose} color="error">
                        Cancelar
                    </Button>
                    <Button
                        disabled={logoValue === "" || nameValue === "" || linkValue === ""}
                        onClick={onConfirmAdd}
                        autoFocus
                    >
                        Confirmar
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
}
