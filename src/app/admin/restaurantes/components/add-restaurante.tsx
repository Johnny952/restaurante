import { Box, Button, TextField, Typography } from "@mui/material";
import { ChangeEvent, useState } from "react";
import toKebabCase from "@/helpers/to-kebab-case";
import Uploader from "./uploader";
import useLoadStore from "@/store/load-store";
import useSnackStore from "@/store/snackbar-store";
import { putRestaurante } from "@/app/api/restaurantes/put-restaurante";

export default function AddRestaurante({ goHere }: { goHere: () => void }) {
    const [nameValue, setNameValue] = useState("");
    const [linkValue, setLinkValue] = useState("");
    const [logoValue, setLogoValue] = useState("");

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
        setLoading(true);
        try {
            await putRestaurante(nameValue, linkValue, logoValue);
            goHere();
            setLogoValue("");
            setNameValue("");
            setLinkValue("");
            snackSuccess("Restaurante creado");
        } catch (error) {
            snackError(`Ocurrió un error: ${error}`);
        }
        setLoading(false);
    }

    return (
        <>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Agregar nuevo restaurante
            </Typography>
            <TextField
                label="Nombre"
                variant="standard"
                value={nameValue}
                disabled={logoValue !== ""}
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
            />
            <TextField
                label="Logo"
                variant="standard"
                fullWidth
                disabled
                required
                value={logoValue}
            />
            <Box flexGrow={1}></Box>
            <Button
                sx={{ mt: "15px" }}
                variant="contained"
                disabled={logoValue === ""}
                onClick={onConfirmAdd}
            >
                Agregar Restaurante
            </Button>
        </>
    );
}
