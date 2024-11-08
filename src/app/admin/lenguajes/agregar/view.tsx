"use client";
import LinkBreadcrumbs from "@/components/link-breadcrumbs";
import { Box, Button, FormControl, FormHelperText, Grid, Input, InputLabel, Paper, SelectChangeEvent, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ChangeEvent, useState } from "react";
import useLoadStore from "@/store/load-store";
import { useRouter } from "next/navigation";
import { put } from "@/lib/services/language";
import { enqueueSnackbar } from "notistack";

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

interface FormData {
    code: string;
    name: string;
}

interface FormErrors {
    code?: string;
    name?: string;
}

export default function AddLanguageView() {
    const [formData, setFormData] = useState<FormData>({
        code: "",
        name: "",
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const router = useRouter();
    const setLoading = useLoadStore((state) => state.setLoading);

    const goBack = () => {
        router.push(".");
    };

    const handleChange = async (
        e:
            | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            | SelectChangeEvent
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        let newErrors: FormErrors = {};

        if (!formData.name) newErrors.name = "El nombre es requerido";
        if (!formData.code) newErrors.code = "El código es requerido";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        setLoading(true);
        if (!validateForm()) {
            enqueueSnackbar({
                message: "Formulario con errores",
                variant: "error",
            });
            return;
        }
        try {
            const res = await put({
                code: formData.code,
                name: formData.name,
            });

            if (res && "error" in res) {
                throw Error(res.error);
            }
            goBack();
            enqueueSnackbar({
                message: "Lenguaje creado",
                variant: "success",
            });
        } catch (error) {
            enqueueSnackbar({
                message: `Ocurrio un error: ${error}`,
                variant: "error",
            });
        }
        setLoading(false);
    };

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
                            Agregar nuevo lenguaje
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl error={!!errors.name}>
                            <InputLabel htmlFor="code-input">Código</InputLabel>
                            <Input
                                id="code-input"
                                aria-describedby="code-error-text"
                                value={formData.code}
                                name="code"
                                onChange={handleChange}
                                required
                            />
                            <FormHelperText id="code-error-text">
                                {errors.code}
                            </FormHelperText>
                        </FormControl>
                    </Grid>


                    <Grid item xs={12}>
                        <FormControl error={!!errors.name}>
                            <InputLabel htmlFor="name-input">Nombre</InputLabel>
                            <Input
                                id="name-input"
                                aria-describedby="name-error-text"
                                value={formData.name}
                                name="name"
                                onChange={handleChange}
                                required
                            />
                            <FormHelperText id="name-error-text">
                                {errors.name}
                            </FormHelperText>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <Box display="flex">
                            <Box flexGrow={1} />
                            <Button
                                disabled={false}
                                onClick={handleSubmit}
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