"use client";
import LinkBreadcrumbs from "@/components/link-breadcrumbs";
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
    TextField,
    Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ChangeEvent, useEffect, useState } from "react";
import useLoadStore from "@/store/load-store";
import useSnackStore from "@/store/snackbar-store";
import { useRouter } from "next/navigation";
import { getAllLanguages } from "@/app/api/restaurantes-languages/get-restaurantes-languages";
import { getAllRestaurants } from "@/app/api/restaurantes/get-restaurante";
import toKebabCase from "@/helpers/to-kebab-case";
import { getAllChildrenByRestLang as getAllCats } from "@/app/api/categories/get-categories";
import UploaderWithCrop from "@/components/uploader-with-crop";
import { putImage } from "@/app/api/upload/put-image";
import formatPrice from "@/helpers/format-price";
import { put } from "@/app/api/dishes/put";

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
    restaurant: string;
    language: string;
    category: string;
    link: string;
    price: string;
    description: string;
}

interface FormErrors {
    name?: string;
    restaurant?: string;
    language?: string;
    category?: string;
    link?: string;
    price?: string;
    description?: string;
}

export default function AddCategoryPage() {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        restaurant: "",
        language: "",
        category: "",
        link: "",
        price: "",
        description: "",
    });
    const [file, setFile] = useState<File | null>(null);
    const [errors, setErrors] = useState<FormErrors>({});

    const [allRestaurants, setAllRestaurants] = useState<
        { id: string; name: string; link: string }[]
    >([]);
    const [allLanguages, setAllLanguages] = useState<
        { id: string; name: string }[]
    >([]);
    const [allCategories, setAllCategories] = useState<
        { id: string; name: string }[]
    >([]);
    const router = useRouter();

    const handleChange = async (
        e:
            | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            | SelectChangeEvent
    ) => {
        const { name, value } = e.target;
        setErrors({});
        if (name === "restaurant") {
            setLoading(true);
            const languages = await getAllLanguages(value);

            setAllLanguages(languages);
            setLoading(false);
            setFormData({
                ...formData,
                [name]: value,
                language: "",
                category: "",
            });
            return;
        }
        if (name === "language") {
            setLoading(true);
            const categories = await getAllCats(formData.restaurant, value);
            setAllCategories(categories);
            setLoading(false);
            setFormData({ ...formData, [name]: value, category: "" });
            return;
        }
        if (name === "price") {
            const regex = /^[0-9]*$/;
            const deformattedValue = value.replaceAll(".", "");
            if (regex.test(deformattedValue) || deformattedValue === "") {
                const formattedValue = deformattedValue
                    ? formatPrice(parseInt(deformattedValue, 10)).slice(1)
                    : "";
                setFormData({ ...formData, [name]: formattedValue });
            }
            return;
        }
        if (name === "name") {
            setFormData({ ...formData, link: toKebabCase(value), name: value });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const validateForm = () => {
        let newErrors: FormErrors = {};

        if (!formData.name) newErrors.name = "El nombre es requerido";
        if (!formData.link) newErrors.link = "El enlace es requerido";
        if (!formData.restaurant)
            newErrors.restaurant = "El restaurante es requerido";
        if (!formData.language) newErrors.language = "El lenguaje es requerido";
        if (!formData.category)
            newErrors.category = "La categoría es requerida";
        if (!formData.price) newErrors.price = "El precio es requerido";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            snackError("Formulario con errores");
            return;
        }
        if (!file) {
            snackError("Debe seleccionar una imagen");
            return;
        }
        setLoading(true);
        try {
            const restaurantLink = allRestaurants.filter(
                (rest) => rest.id === formData.restaurant
            );
            const url = await putImage(
                file,
                `restaurante/${restaurantLink[0].link}/dishes/${formData.link}/.png`
            );
            if (url === null) {
                throw Error("La imagen no tiene enlace");
            }
            await put(
                formData.name,
                formData.category,
                formData.link,
                url,
                formData.description,
                formData.price.replaceAll(".", "")
            );
            goBack();
            snackSuccess("Plato creado");
        } catch (error) {
            snackError(`Ocurrió un error: ${error}`);
        }
        setLoading(false);
    };

    const setLoading = useLoadStore((state) => state.setLoading);
    const snackSuccess = useSnackStore((state) => state.setOpenSuccess);
    const snackError = useSnackStore((state) => state.setOpenError);

    const goBack = () => {
        router.push("/admin/platos");
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            return getAllRestaurants();
        };

        fetchData()
            .then((restaurants) => {
                setAllRestaurants(restaurants);
                setLoading(false);
            })
            .catch((error) => {
                snackError(`Ocurrió un error: ${error.toString()}`);
                setLoading(false);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                <Grid container rowSpacing={2} spacing={2}>
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
                            Agregar nuevo plato
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FormControl error={!!errors.name} fullWidth>
                            <InputLabel htmlFor="name-input">Nombre</InputLabel>
                            <Input
                                id="name-input"
                                aria-describedby="name-error-text"
                                value={formData.name}
                                name="name"
                                onChange={handleChange}
                                required
                                fullWidth
                            />
                            <FormHelperText id="name-error-text">
                                {errors.name}
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl error={!!errors.link} fullWidth>
                            <InputLabel htmlFor="link-input">Link</InputLabel>
                            <Input
                                id="link-input"
                                aria-describedby="link-error-text"
                                value={formData.link}
                                name="link"
                                disabled
                                required
                                fullWidth
                            />
                            <FormHelperText id="link-error-text">
                                {errors.link}
                            </FormHelperText>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FormControl error={!!errors.price} fullWidth>
                            <InputLabel htmlFor="price-input">
                                Precio
                            </InputLabel>
                            <Input
                                id="price-input"
                                aria-describedby="price-error-text"
                                value={formData.price}
                                onChange={handleChange}
                                name="price"
                                type="text"
                                required
                                inputProps={{
                                    inputMode: "decimal",
                                }}
                                fullWidth
                                startAdornment={"$"}
                            />
                            <FormHelperText id="price-error-text">
                                {errors.price}
                            </FormHelperText>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <InputLabel htmlFor="description-input">
                            Descripción
                        </InputLabel>
                        <FormControl error={!!errors.description} fullWidth>
                            <TextField
                                id="description-input"
                                aria-describedby="description-error-text"
                                multiline
                                rows={6}
                                value={formData.description}
                                onChange={handleChange}
                                fullWidth
                                name="description"
                                required
                            />
                            <FormHelperText id="description-error-text">
                                {errors.description}
                            </FormHelperText>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth error={!!errors.restaurant}>
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
                                required
                                fullWidth
                            >
                                {allRestaurants.map((rest) => (
                                    <MenuItem key={rest.id} value={rest.id}>
                                        {rest.name}
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText id="restaurant-error-text">
                                {errors.restaurant}
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth error={!!errors.language}>
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
                                fullWidth
                                required
                            >
                                {allLanguages.map((lang) => (
                                    <MenuItem key={lang.id} value={lang.id}>
                                        {lang.name}
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText id="language-error-text">
                                {errors.language}
                            </FormHelperText>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth error={!!errors.category}>
                            <InputLabel id="language-selector-label">
                                Categoría
                            </InputLabel>
                            <Select
                                labelId="category-selector-label"
                                id="category-selector"
                                value={formData.category}
                                label="Categoría"
                                name="category"
                                onChange={handleChange}
                                disabled={
                                    !(formData.restaurant && formData.language)
                                }
                                fullWidth
                            >
                                {allCategories.map((cat) => (
                                    <MenuItem key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText id="category-error-text">
                                {errors.category}
                            </FormHelperText>
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
        </div>
    );
}
