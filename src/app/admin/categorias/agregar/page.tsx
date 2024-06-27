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
import { getAllParentsByRestLang as getAllCats } from "@/app/api/categories/get-categories";
import UploaderWithCrop from "@/components/uploader-with-crop";
import { putImage } from "@/app/api/upload/put-image";
import { put } from "@/app/api/categories/put";

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

export default function AddCategoryPage() {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        restaurant: "",
        language: "",
        link: "",
        parent: "root",
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
        if (e.target.name === "restaurant") {
            setLoading(true);
            const languages = await getAllLanguages(e.target.value);

            setAllLanguages(languages);
            setLoading(false);
        }
        if (e.target.name === "language") {
            setLoading(true);
            const categories = await getAllCats(
                formData.restaurant,
                e.target.value
            );
            setAllCategories(categories);
            setLoading(false);
        }
        if (e.target.name === "name") {
            setFormData({
                ...formData,
                link: toKebabCase(e.target.value),
                name: e.target.value,
            });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
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

    const handleSubmit = async () => {
        if (!file) {
            snackError("Debe seleccionar una imagen");
            return;
        }
        if (!validateForm()) {
            snackError("Formulario con errores");
            return;
        }
        setLoading(true);
        try {
            const restaurantLink = allRestaurants.filter(
                (rest) => rest.id === formData.restaurant
            );
            const url = await putImage(
                file,
                `restaurante/${restaurantLink[0].link}/categories/${formData.link}/.png`
            );
            if (url === null) {
                throw Error("La imagen no tiene enlace");
            }
            await put(
                formData.name,
                formData.restaurant,
                formData.language,
                formData.link,
                formData.parent,
                url
            );
            goBack();
            snackSuccess("Categoría creado");
        } catch (error) {
            snackError(`Ocurrió un error: ${error}`);
        }
        setLoading(false);
    };

    const setLoading = useLoadStore((state) => state.setLoading);
    const snackSuccess = useSnackStore((state) => state.setOpenSuccess);
    const snackError = useSnackStore((state) => state.setOpenError);

    const goBack = () => {
        router.push("/admin/categorias");
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
                                {allRestaurants.map((rest) => (
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
                                {allLanguages.map((lang) => (
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
                                {allCategories.map((cat) => (
                                    <MenuItem key={cat.id} value={cat.id}>
                                        {cat.name}
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
        </div>
    );
}
