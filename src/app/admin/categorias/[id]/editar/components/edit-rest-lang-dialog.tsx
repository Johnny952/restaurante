import useLoadStore from "@/store/load-store";
import useSnackStore from "@/store/snackbar-store";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getAllLanguages } from "@/app/api/restaurantes-languages/get-restaurantes-languages";
import { getAllRestaurants } from "@/app/api/restaurantes/get-restaurante";
import { updateRestLang } from "@/app/api/categories/update";

interface FormData {
    restaurant: string;
    language: string;
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
    });
    const [allRestaurants, setAllRestaurants] = useState<
        { id: string; name: string; link: string }[]
    >([]);
    const [allLanguages, setAllLanguages] = useState<
        { id: string; name: string }[]
    >([]);
    const setLoading = useLoadStore((state) => state.setLoading);
    const snackSuccess = useSnackStore((state) => state.setOpenSuccess);
    const snackError = useSnackStore((state) => state.setOpenError);

    const handleChange = async (e: SelectChangeEvent) => {
        if (e.target.name === "restaurant") {
            setLoading(true);
            const languages = await getAllLanguages(e.target.value);

            setAllLanguages(languages);
            setLoading(false);
            setFormData({ restaurant: e.target.value, language: "" });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await updateRestLang(id, formData.restaurant, formData.language);
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
    }, [id, onClose]);

    return (
        <Dialog open={open} aria-labelledby="edit-dialog-title">
            <DialogTitle id="edit-dialog-title">
                Editar Lenguaje y Restaurante
            </DialogTitle>
            <DialogContent>
                <Grid container>
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
                                sx={{ minWidth: "200px" }}
                                required
                                fullWidth
                            >
                                {allRestaurants.map((rest) => (
                                    <MenuItem key={rest.id} value={rest.id}>
                                        {rest.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid xs={12} sx={{ mt: "10px" }}>
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
                                sx={{ minWidth: "200px" }}
                                required
                                fullWidth
                            >
                                {allLanguages.map((lang) => (
                                    <MenuItem key={lang.id} value={lang.id}>
                                        {lang.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                <DialogActions>
                    <Button
                        onClick={() => {
                            setFormData({
                                restaurant: "",
                                language: "",
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
                        disabled={!formData.language || !formData.restaurant}
                    >
                        Confirmar
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
}
