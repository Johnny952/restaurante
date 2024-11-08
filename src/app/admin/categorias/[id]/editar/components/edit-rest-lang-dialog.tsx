"use client"
import useLoadStore from "@/store/load-store";
import {
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
} from "@mui/material";
import { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import { getAllByRestaurantLink } from "@/lib/services/language";
import { LanguageType, RestaurantLanguageType } from "@/lib/models/language";
import { getAll } from "@/lib/services/restaurant";
import { updateRestaurantLanguage } from "@/lib/services/category";

interface FormData {
    restaurant: string;
    language: string;
}

export default function EditRestLangDialog({
    open,
    id,
}: {
    open: boolean;
    id: string;
}) {
    const [formData, setFormData] = useState<FormData>({
        restaurant: "",
        language: "",
    });
    const [restaurants, setRestaurants] = useState<
        { id: number; name: string; link: string }[]
    >([]);
    const [languages, setLanguages] = useState<RestaurantLanguageType[]>([]);
    const setLoading = useLoadStore((state) => state.setLoading);
    const router = useRouter();

    const handleChange = async (e: SelectChangeEvent) => {
        if (e.target.name === "restaurant") {
            setLoading(true);
            const languagesResponse = await getAllByRestaurantLink(e.target.value);
            if ("error" in languagesResponse) {
                enqueueSnackbar({
                    message: `Ocurrio un error: ${languagesResponse.error}`,
                    variant: "error",
                    autoHideDuration: 3000,
                });
                return;
            }
            setLanguages(languagesResponse);
            setLoading(false);
            setFormData({ restaurant: e.target.value, language: "" });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            // await updateRestaurantLanguage(
            //     id,
            //     formData.restaurant,
            //     formData.language
            // );
            setFormData({
                restaurant: "",
                language: "",
            });
            router.push("editar");
            router.refresh();
            enqueueSnackbar({
                message: "Categoría editada",
                variant: "success",
                autoHideDuration: 3000,
            });
        } catch (error) {
            enqueueSnackbar({
                message: "Ocurrio un error",
                variant: "error",
                autoHideDuration: 3000,
            });
        }
        setLoading(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            return getAll();
        };

        fetchData()
            .then((restaurantsResponse) => {
                if ("error" in restaurantsResponse) {
                    throw restaurantsResponse.error;
                }
                setRestaurants(restaurantsResponse);
            })
            .catch((error) => {
                enqueueSnackbar({
                    message: `Ocurrio un error: ${error.toString()}`,
                    variant: "error",
                    autoHideDuration: 3000,
                });
            });
    }, [id]);

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
                                {restaurants.map((rest) => (
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
                                {languages.map((lang) => (
                                    <MenuItem key={lang.id} value={lang.id}>
                                        {lang.language_name}
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
                            router.push("editar");
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
