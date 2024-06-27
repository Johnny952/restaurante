import useLoadStore from "@/store/load-store";
import useSnackStore from "@/store/snackbar-store";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getAllLanguages } from "@/app/api/restaurantes-languages/get-restaurantes-languages";
import { getAllRestaurants } from "@/app/api/restaurantes/get-restaurante";
import { getAllChildrenByRestLang as getAllCats } from "@/app/api/categories/get-categories";
import { updateCategory } from "@/app/api/dishes/update";

interface FormData {
    restaurant: string;
    language: string;
    category: string;
}

interface FormErrors {
    restaurant?: string;
    language?: string;
    category?: string;
}

export default function EditRestLangDialog({
    open,
    id,
    onClose,
}: {
    open: boolean;
    id: string;
    onClose: () => void;
}) {
    const [formData, setFormData] = useState<FormData>({
        restaurant: "",
        language: "",
        category: "",
    });
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
    const setLoading = useLoadStore((state) => state.setLoading);
    const snackSuccess = useSnackStore((state) => state.setOpenSuccess);
    const snackError = useSnackStore((state) => state.setOpenError);

    const validateForm = () => {
        let newErrors: FormErrors = {};

        if (!formData.restaurant)
            newErrors.restaurant = "El restaurante es requerido";
        if (!formData.language) newErrors.language = "El lenguaje es requerido";
        if (!formData.category)
            newErrors.category = "La categoría es requerida";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = async (e: SelectChangeEvent) => {
        const { name, value } = e.target;
        if (name === "restaurant") {
            setLoading(true);
            const languages = await getAllLanguages(value);
            setAllLanguages(languages);
            setLoading(false);
            setFormData({ restaurant: value, language: "", category: "" });
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
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            snackError("Formulario con errores");
            return;
        }
        setLoading(true);
        try {
            await updateCategory(id, formData.category)
            setFormData({
                restaurant: "",
                language: "",
                category: "",
            });
            onClose();

            snackSuccess("Categoría editada");
        } catch (error) {
            snackError(`Ocurrió un error: ${error}`);
        }
        setLoading(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            return getAllRestaurants();
        };

        fetchData()
            .then((restaurants) => {
                setAllRestaurants(restaurants);
            })
            .catch((error) => {
                snackError(`Ocurrió un error: ${error.toString()}`);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return (
        <Dialog open={open} aria-labelledby="edit-dialog-title">
            <DialogTitle id="edit-dialog-title">
                Editar Restaurante, Lenguaje y Categoría
            </DialogTitle>
            <DialogContent>
                <Grid container>
                    <Grid item xs={12}>
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
                    <Grid item xs={12}>
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

                    <Grid item xs={12}>
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
                </Grid>

                <DialogActions>
                    <Button
                        onClick={() => {
                            setFormData({
                                restaurant: "",
                                language: "",
                                category: "",
                            });
                            onClose();
                        }}
                        color="error"
                        autoFocus
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        autoFocus
                    >
                        Confirmar
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
}
