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
import {
    InputAdornment,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    TextField,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import ArrowBack from "@mui/icons-material/ArrowBack";
import UploaderWithCrop from "@/components/uploader-with-crop";
import toKebabCase from "@/helpers/to-kebab-case";
import { enqueueSnackbar } from "notistack";
import { putImage } from "@/app/api/upload/put-image";
import { generateDishLink } from "@/app/api/helpers/image-links";
import { put } from "@/lib/services/dishes";
import { BaseRestaurantType } from "@/lib/models/restaurant";
import { CategoryType } from "@/lib/models/categories";
import { LanguageType } from "@/lib/models/language";
import { getByRestaurant } from "@/lib/services/language";
import { getAllChildren } from "@/lib/services/category";
import formatPrice from "@/helpers/format-price";

const breadcrumbs = [
    {
        name: "Home",
        link: "/admin",
    },
    {
        name: "Platos",
        link: "/admin/platos",
    },
    {
        name: "Agregar",
    },
];

interface FormData {
    name: string;
    link: string;
    price: number;
    image?: string;
    description?: string;
    category: string;
    language: string;
    restaurant: string;
}

interface FormErrors {
    name?: string;
    link?: string;
    price?: string;
    image?: string;
    description?: string;
    category?: string;
    language?: string;
}

interface Props {
    restaurants: BaseRestaurantType[];
}

export default function AddRestaurantView({ restaurants }: Props) {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        link: "",
        price: 0,
        category: "",
        language: "",
        restaurant: "",
    });
    const [file, setFile] = useState<File | null>(null);
    const [errors, setErrors] = useState<FormErrors>({});

    const [languages, setLanguages] = useState<LanguageType[]>([]);
    const [categories, setCategories] = useState<CategoryType[]>([]);

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
        if (e.target.name === "restaurant") {
            setLoading(true);
            const restaurantId = e.target.value;
            if (!restaurantId) {
                enqueueSnackbar({
                    message: "Error al cargar restaurantes",
                    variant: "error",
                });
                setLoading(false);
                return;
            }
            const languagesResponse = await getByRestaurant(
                parseInt(restaurantId, 10)
            );
            if ("error" in languagesResponse) {
                enqueueSnackbar({
                    message: "Error al cargar lenguajes",
                    variant: "error",
                });
                setLoading(false);
                return;
            }
            setLanguages(languagesResponse);
            setLoading(false);
        }
        if (e.target.name === "language") {
            setLoading(true);
            const categoriesResponse = await getAllChildren(
                formData.restaurant,
                e.target.value
            );
            if ("error" in categoriesResponse) {
                setCategories([]);
            } else {
                setCategories(categoriesResponse);
            }
            setLoading(false);
        }
        if (e.target.name === "name") {
            setFormData({
                ...formData,
                link: toKebabCase(e.target.value),
                name: e.target.value,
            });
            setLoading(false);
            return;
        }
        if (e.target.name === "price") {
            setFormData({
                ...formData,
                price: parseInt(e.target.value.replaceAll(".", ""), 10),
            });
        }

        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        setLoading(true);
        if (!file) {
            enqueueSnackbar({
                message: "Debe seleccionar una imagen",
                variant: "error",
            });
            setLoading(false);
            return;
        }
        if (!validateForm()) {
            enqueueSnackbar({
                message: `Formulario con errores: ${Object.values(errors).join(", ")}`,
                variant: "error",
            });
            setLoading(false);
            return;
        }
        try {
            let fileUrl;
            if (file) {
                fileUrl = await putImage(
                    file,
                    generateDishLink(
                        restaurants
                            .find(
                                (restaurant) =>
                                    restaurant.link === formData.restaurant
                            )
                            ?.id.toString() || "",
                        formData.link
                    )
                );
            }
            const res = await put({
                name: formData.name,
                price: formData.price,
                image: fileUrl,
                description: formData.description,
                link: formData.link,
                categoryId: formData.category,
                languageId: formData.language,
            });

            if (res && "error" in res) {
                throw Error(res.error);
            }
            goBack();
            enqueueSnackbar({
                message: "Plato creado",
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
        if (!formData.price) newErrors.price = "El precio es requerido";
        if (!formData.category)
            newErrors.category = "La categoría es requerida";
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
                            Agregar nuevo plato
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
                        <FormControl error={!!errors.price}>
                            <InputLabel htmlFor="price-input">
                                Precio
                            </InputLabel>
                            <OutlinedInput
                                id="price-input"
                                aria-describedby="price-error-text"
                                onChange={handleChange}
                                value={formData.price}
                                name="price"
                                startAdornment={
                                    <InputAdornment position="start">
                                        $
                                    </InputAdornment>
                                }
                                required
                            />
                            <FormHelperText id="price-error-text">
                                {errors.price}
                            </FormHelperText>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            id="description-input"
                            aria-describedby="description-error-text"
                            label="Descripción"
                            onChange={handleChange}
                            value={formData.description}
                            name="description"
                            multiline
                            sx={{ minWidth: "400px" }}
                            maxRows={4}
                        />
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
                                    <MenuItem key={rest.id} value={rest.id}>
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
                                Categoría
                            </InputLabel>
                            <Select
                                labelId="category-selector-label"
                                id="category-selector"
                                value={formData.category}
                                label="Categoría padre"
                                name="category"
                                onChange={handleChange}
                                disabled={
                                    !(formData.restaurant && formData.language)
                                }
                                sx={{ minWidth: "150px" }}
                            >
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
