"use client";
import LinkBreadcrumbs from "@/components/link-breadcrumbs";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import useLoadStore from "@/store/load-store";
import { SelectChangeEvent } from "@mui/material";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import ArrowBack from "@mui/icons-material/ArrowBack";
import UploaderWithCrop from "@/components/uploader-with-crop";
import toKebabCase from "@/helpers/to-kebab-case";
import { enqueueSnackbar } from "notistack";
import { putImage } from "@/app/api/upload/put-image";
import {
    generateRestaurantImgLink,
    generateRestaurantLogoLink,
} from "@/app/api/helpers/image-links";
import { put } from "@/lib/services/restaurant";

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

interface FormData {
    name: string;
    link: string;
    logo: string;
    backgroundImage: string;
}

interface FormErrors {
    name?: string;
    link?: string;
    logo?: string;
    backgroundImage?: string;
}

export default function AddRestaurantView() {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        link: "",
        logo: "",
        backgroundImage: "",
    });
    const [logo, setLogo] = useState<File | null>(null);
    const [background, setBackground] = useState<File | null>(null);
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
        if (e.target.name === "name") {
            setFormData({
                ...formData,
                link: toKebabCase(e.target.value),
                name: e.target.value,
            });
            return;
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        if (!logo) {
            enqueueSnackbar({
                message: "Debe seleccionar un logo",
                variant: "error",
            });
            return;
        }
        if (!validateForm()) {
            enqueueSnackbar({
                message: "Formulario con errores",
                variant: "error",
            });
            return;
        }
        try {
            let logoUrl;
            let bgUrl;
            if (background) {
                [logoUrl, bgUrl] = await Promise.all([
                    putImage(logo, generateRestaurantLogoLink(formData.link)),
                    putImage(
                        background,
                        generateRestaurantImgLink(formData.link)
                    ),
                ]);
            } else {
                logoUrl = await putImage(
                    logo,
                    generateRestaurantLogoLink(formData.link)
                );
            }

            if (!logoUrl || logoUrl === null) {
                throw Error("La imagen no tiene enlace");
            }
            const res = await put({
                name: formData.name,
                link: formData.link,
                logo: logoUrl,
                background: bgUrl,
            });

            if (res && "error" in res) {
                throw Error(res.error);
            }
            goBack();
            enqueueSnackbar({
                message: "Restaurante creado",
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

    const validateForm = () => {
        let newErrors: FormErrors = {};

        if (!formData.name) newErrors.name = "El nombre es requerido";
        if (!formData.link) newErrors.link = "El enlace es requerido";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return (
        <>
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
                            startIcon={<ArrowBack />}
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
                        <FormControl error={!!errors.link}>
                            <InputLabel htmlFor="link-input">Link</InputLabel>
                            <Input
                                id="link-input"
                                aria-describedby="link-error-text"
                                value={formData.link}
                                name="link"
                                disabled
                                required
                            />
                            <FormHelperText id="link-error-text">
                                {errors.link}
                            </FormHelperText>
                        </FormControl>
                    </Grid>

                    <Grid xs={12}>
                        <Divider sx={{ mt: "15px" }} />
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl error={!!errors.logo}>
                            <InputLabel>Logo</InputLabel>
                            <UploaderWithCrop setCroppedFile={setLogo} />
                            <FormHelperText id="logo-error-text">
                                {errors.logo}
                            </FormHelperText>
                        </FormControl>
                    </Grid>

                    <Grid xs={12}>
                        <Divider sx={{ mt: "15px" }} />
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl error={!!errors.backgroundImage}>
                            <InputLabel>Background</InputLabel>
                            <UploaderWithCrop setCroppedFile={setBackground} />
                            <FormHelperText id="bg-error-text">
                                {errors.backgroundImage}
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
        </>
    );
}
