"use client";
import LinkBreadcrumbs from "@/components/link-breadcrumbs";
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
    Typography,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import useLoadStore from "@/store/load-store";
import { useRouter } from "next/navigation";
import { BaseRestaurantType } from "@/lib/models/restaurant";
import { LanguageType } from "@/lib/models/language";
import { enqueueSnackbar } from "notistack";
import { put } from "@/lib/services/restaurants-languages";
import ArrowBack from "@mui/icons-material/ArrowBack";

const breadcrumbs = [
    {
        name: "Home",
        link: "/admin",
    },
    {
        name: "Restaurantes-Lenguajes",
        link: "/admin/restaurantes-lenguajes",
    },
    {
        name: "Agregar",
    },
];

interface FormData {
    restaurant: string;
    language: string;
}

interface FormErrors {
    restaurant?: string;
    language?: string;
}

interface Props {
    restaurants: BaseRestaurantType[]
    languages: LanguageType[]
}

export default function AddRestLanguageView(props: Props) {
    const [formData, setFormData] = useState<FormData>({
        restaurant: "",
        language: "",
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

        if (!formData.restaurant) newErrors.restaurant = "El restaurante es requerido";
        if (!formData.language) newErrors.language = "El lenguaje es requerido";

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
                restaurant_id: formData.restaurant,
                language_id: formData.language,
            });

            if (res && "error" in res) {
                throw Error(res.error);
            }
            goBack();
            enqueueSnackbar({
                message: "Asociación creada",
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
                            Agregar nueva restaurante/lenguaje
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl error={!!errors.restaurant}>
                            <InputLabel htmlFor="restaurant-input">Restaurante</InputLabel>
                            <Select
                                labelId="restaurant-selector-label"
                                id="restaurant-selector"
                                value={formData.restaurant}
                                name="restaurant"
                                label="Restaurante"
                                onChange={handleChange}
                                sx={{ minWidth: "200px" }}
                                required
                                fullWidth
                            >
                                {props.restaurants.map((res) => (
                                    <MenuItem key={res.id} value={res.id}>
                                        {res.name}
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText id="restaurant-error-text">
                                {errors.restaurant}
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl error={!!errors.language}>
                            <InputLabel htmlFor="language-input">Lenguaje</InputLabel>
                            <Select
                                labelId="language-selector-label"
                                id="language-selector"
                                value={formData.language}
                                name="language"
                                label="Lenguaje"
                                onChange={handleChange}
                                sx={{ minWidth: "200px" }}
                                required
                                fullWidth
                            >
                                {props.languages.map((lan) => (
                                    <MenuItem key={lan.id} value={lan.id}>
                                        {lan.name}
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText id="language-error-text">
                                {errors.language}
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