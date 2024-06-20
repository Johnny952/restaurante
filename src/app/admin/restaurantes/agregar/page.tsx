"use client";
import LinkBreadcrumbs from "@/components/link-breadcrumbs";
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ChangeEvent, useState } from "react";
import toKebabCase from "@/helpers/to-kebab-case";
import useLoadStore from "@/store/load-store";
import useSnackStore from "@/store/snackbar-store";
import { putImage } from "@/app/api/upload/put-image";
import { putRestaurante } from "@/app/api/restaurantes/put-restaurante";
import Uploader from "../../../../components/uploader";
import { useRouter } from "next/navigation";

const breadcrumbs = [
    {
        name: "Home",
        link: "/admin",
    },
    {
        name: "Restaurantes",
        link: "/admin/restaurantes",
    },
    {
        name: "Agregar",
    },
];

export default function AddRestaurantePage() {
    const [nameValue, setNameValue] = useState("");
    const [linkValue, setLinkValue] = useState("");
    const [file, setfile] = useState<File | null>(null);
    const router = useRouter();

    function onNameValueChange(
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        setNameValue(event.target.value);
        setLinkValue(toKebabCase(event.target.value));
    }
    const setLoading = useLoadStore((state) => state.setLoading);
    const snackSuccess = useSnackStore((state) => state.setOpenSuccess);
    const snackError = useSnackStore((state) => state.setOpenError);

    const goBack = () => {
        router.push("/admin/restaurantes");
    };

    async function onConfirmAdd() {
        if (file) {
            setLoading(true);
            try {
                const url = await putImage(
                    file,
                    `restaurante/${linkValue}/logo.png`
                );

                if (url === null) {
                    throw Error("La imagen no tiene enlace");
                }
                await putRestaurante(nameValue, linkValue, url);
                goBack();
                snackSuccess("Restaurante creado");
            } catch (error) {
                snackError(`Ocurrió un error: ${error}`);
            }
            setLoading(false);
        } else {
            snackError("Ninguna imagen seleccionada");
        }
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
                            Agregar nuevo restaurante
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
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
                    </Grid>

                    <Grid item xs={12}>
                        <Uploader setFile={setfile} />
                    </Grid>
                    <Grid item xs={12}>
                        <Box display="flex">
                            <Box flexGrow={1} />
                            <Button
                                disabled={
                                    file === null ||
                                    nameValue === "" ||
                                    linkValue === ""
                                }
                                onClick={onConfirmAdd}
                                autoFocus
                                sx={{ alignSelf: "end" }}
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
