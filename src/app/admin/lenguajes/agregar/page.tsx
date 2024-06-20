"use client";
import LinkBreadcrumbs from "@/components/link-breadcrumbs";
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ChangeEvent, useState } from "react";
import useLoadStore from "@/store/load-store";
import useSnackStore from "@/store/snackbar-store";
import { useRouter } from "next/navigation";
import { putLanguage } from "@/app/api/languages/put-language";

const breadcrumbs = [
    {
        name: "Home",
        link: "/admin",
    },
    {
        name: "Lenguajes",
        link: "/admin/lenguajes",
    },
    {
        name: "Agregar",
    },
];

export default function AddLanguagePage() {
    const [idValue, setIdValue] = useState("");
    const [nameValue, setNameValue] = useState("");
    const router = useRouter();
    const setLoading = useLoadStore((state) => state.setLoading);
    const snackSuccess = useSnackStore((state) => state.setOpenSuccess);
    const snackError = useSnackStore((state) => state.setOpenError);

    const goBack = () => {
        router.push("/admin/lenguajes");
    };

    function onIDChange(
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        if (event.target.value.length <= 2) {
            setIdValue(event.target.value);
        }
    }

    async function onConfirmAdd() {
        setLoading(true);
        try {
            await putLanguage(idValue, nameValue);
            goBack();
            snackSuccess("Lenguaje creado");
        } catch (error) {
            snackError(`Ocurrió un error: ${error}`);
        }
        setLoading(false);
    }

    return (
        <div>
            <LinkBreadcrumbs breadcrumbs={breadcrumbs} />

            <Paper
                elevation={0}
                sx={{
                    mt: "20px",
                    p: "20px",
                    border: "1px solid rgba(0, 0, 0, 0.12)",
                    color: "rgb(114, 119, 122)",
                }}
            >
                <Grid container rowSpacing={2}>
                    <Grid item xs={12}>
                        <Button
                            variant="text"
                            startIcon={<ArrowBackIcon />}
                            onClick={goBack}
                        >
                            Atrás
                        </Button>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="h6">
                            Agregar nuevo lenguage
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            label="ID"
                            error={false}
                            helperText="No debe exceder los 2 caracteres"
                            variant="standard"
                            onChange={onIDChange}
                            value={idValue}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Nombre"
                            variant="standard"
                            value={nameValue}
                            onChange={(e) => setNameValue(e.target.value)}
                            fullWidth
                            required
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Box display="flex">
                            <Box flexGrow={1} />
                            <Button
                                disabled={nameValue === "" || idValue === ""}
                                onClick={onConfirmAdd}
                                autoFocus
                            >
                                Confirmar
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}
