"use client";
import { putImage } from "@/app/api/upload/put-image";
import LinkBreadcrumbs from "@/components/link-breadcrumbs";
import UploaderWithCrop from "@/components/uploader-with-crop";
import { LanguageType } from "@/lib/models/language";
import { getByRestaurant } from "@/lib/services/language";
import useLoadStore from "@/store/load-store";
import {
    Box,
    Button,
    Divider,
    FormControl,
    FormHelperText,
    Grid,
    Input,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
    Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { ChangeEvent, useEffect, useState } from "react";
import ArrowBack from "@mui/icons-material/ArrowBack";
import toKebabCase from "@/helpers/to-kebab-case";
import { CategoryType } from "@/lib/models/categories";
import {
    getAllParentsByRestaurantLanguage,
    put,
} from "@/lib/services/category";

const breadcrumbs = [
    {
        name: "Home",
        link: "/admin",
    },
    {
        name: "Categorías",
        link: "/admin/categorias",
    },
    {
        name: "Agregar",
    },
];

interface FormData {
    name: string;
    restaurant: string;
    language: string;
    link: string;
    parent: string;
}

interface FormErrors {
    name?: string;
    restaurant?: string;
    language?: string;
    link?: string;
    parent?: string;
}

interface Props {
    restaurants: {
        id: number;
        name: string;
        link: string;
    }[];
}

export default function AddCategoryView({ restaurants }: Props) {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        restaurant: "",
        language: "",
        link: "",
        parent: "",
    });
    const [file, setFile] = useState<File | null>(null);
    const [errors, setErrors] = useState<FormErrors>({});

    const [languages, setLanguages] = useState<LanguageType[]>([]);
    const [categories, setCategories] = useState<CategoryType[]>([]);

    const setLoading = useLoadStore((state) => state.setLoading);
    const router = useRouter();

    const goBack = () => {
        router.push(".");
    };

    const handleChange = async (
        e:
            | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            | SelectChangeEvent
    ) => {
        if (e.target.name === "restaurant") {
            setLoading(true);
            const restaurantId = restaurants.find(
                (restaurant) => restaurant.link === e.target.value
            )?.id
            if (!restaurantId) {
                enqueueSnackbar({
                    message: "Error al cargar restaurantes",
                    variant: "error",
                });
                setLoading(false)
                return;
            }
            const languagesResponse = await getByRestaurant(restaurantId);
            if ("error" in languagesResponse) {
                enqueueSnackbar({
                    message: "Error al cargar lenguajes",
                    variant: "error",
                });
                setLoading(false)
                return;
            }
            setLanguages(languagesResponse);
            setLoading(false);
        }
        if (e.target.name === "language") {
            setLoading(true);
            const categoriesResponse = await getAllParentsByRestaurantLanguage(
                formData.restaurant,
                e.target.value
            );
            if ("error" in categoriesResponse) {
                setCategories([])
                setLoading(false)
            } else {
                setCategories(categoriesResponse);
                setLoading(false);
            }
        }
        if (e.target.name === "name") {
            setFormData({
                ...formData,
                link: toKebabCase(e.target.value),
                name: e.target.value,
            });
            setLoading(false)
            return;
        } else {
            setLoading(false)
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        if (!file) {
            enqueueSnackbar({
                message: "Debe seleccionar una imagen",
                variant: "error",
            });
            setLoading(false)
            return;
        }
        if (!validateForm()) {
            enqueueSnackbar({
                message: "Formulario con errores",
                variant: "error",
            });
            setLoading(false)
            return;
        }
        try {
            const url = await putImage(
                file,
                `restaurante/${formData.restaurant}/categories/${formData.link}.png`
            );
            if (!url || url === null) {
                enqueueSnackbar({
                    message: "La imagen no tiene enlace",
                    variant: "error",
                });
                setLoading(false)
                return;
            }
            const restaurantId = restaurants.find(
                (rest) => rest.link === formData.restaurant
            )?.id;
            if (!restaurantId) {
                enqueueSnackbar({
                    message: "Restaurante no encontrado",
                    variant: "error",
                });
                setLoading(false)
                return;
            }
            const res = await put(
                formData.name,
                restaurantId,
                formData.language,
                formData.link,
                formData.parent,
                url
            );
            if (res && "error" in res) {
                throw Error(res.error);
            }
            goBack();
            enqueueSnackbar({
                message: "Categoría creada",
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
        if (!formData.restaurant)
            newErrors.restaurant = "El restaurante es requerido";
        if (!formData.language) newErrors.language = "El lenguaje es requerido";

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
                            Agregar nueva categoría
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

                    <Grid item xs={12}>
                        <FormControl>
                            <InputLabel id="restaurant-selector-label">
                                Restaurante
                            </InputLabel>
                            <Select
                                labelId="restaurant-selector-label"
                                id="restaurant-selector"
                                value={formData.restaurant}
                                name="restaurant"
                                label="Restaurante"
                                onChange={handleChange}
                                sx={{ minWidth: "150px" }}
                                required
                            >
                                {restaurants.map((rest) => (
                                    <MenuItem key={rest.id} value={rest.link}>
                                        {rest.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl>
                            <InputLabel id="language-selector-label">
                                Lenguaje
                            </InputLabel>
                            <Select
                                labelId="language-selector-label"
                                id="language-selector"
                                value={formData.language}
                                label="Lenguaje"
                                name="language"
                                onChange={handleChange}
                                disabled={!formData.restaurant}
                                sx={{ minWidth: "150px" }}
                                required
                            >
                                {languages.map((lang) => (
                                    <MenuItem key={lang.id} value={lang.id}>
                                        {lang.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl>
                            <InputLabel id="language-selector-label">
                                Categoría padre
                            </InputLabel>
                            <Select
                                labelId="category-selector-label"
                                id="category-selector"
                                value={formData.parent}
                                label="Categoría padre"
                                name="parent"
                                onChange={handleChange}
                                disabled={
                                    !(formData.restaurant && formData.language)
                                }
                                sx={{ minWidth: "150px" }}
                            >
                                <MenuItem value={""}>
                                    No categoría padre
                                </MenuItem>
                                {categories.map((cat) => (
                                    <MenuItem key={cat.id} value={cat.id}>
                                        {cat.category_name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid xs={12}>
                        <Divider sx={{ mt: "15px" }} />
                    </Grid>

                    <Grid item xs={12}>
                        <UploaderWithCrop setCroppedFile={setFile} />
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
