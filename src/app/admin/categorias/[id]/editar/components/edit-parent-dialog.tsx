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
import { CategoryType } from "@/lib/models/categories";
import { enqueueSnackbar } from "notistack";
import {
    getAllParentsByRestaurantLanguage,
    updateParent,
} from "@/lib/services/category";
import { useRouter } from "next/navigation";

interface FormData {
    parent: string;
}

export default function EditParentDialog({
    open,
    id,
    category,
}: {
    open: boolean;
    id: string;
    category: CategoryType & {
        restaurant_name: string;
        restaurant_link: string;
        parent: string;
        language: string;
    };
}) {
    const [formData, setFormData] = useState<FormData>({
        parent: "",
    });
    const [allCategories, setAllCategories] = useState<CategoryType[]>([]);
    const setLoading = useLoadStore((state) => state.setLoading);
    const router = useRouter();

    const handleChange = async (e: SelectChangeEvent) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await updateParent(id, formData.parent);
            setFormData({
                parent: "",
            });
            router.push("editar");
            router.refresh();
            enqueueSnackbar({
                message: "Categoría editada",
                variant: "success",
            });
        } catch (error) {
            enqueueSnackbar({
                message: `Ocurrio un error: ${error}`,
                variant: "error",
                autoHideDuration: 3000,
            });
        }
        setLoading(false);
    };

    useEffect(() => {
        getAllParentsByRestaurantLanguage(
            category.restaurant_link,
            category.language
        )
            .then((parents) => {
                if ("error" in parents) {
                    throw parents.error;
                }
                setAllCategories(parents);
            })
            .catch((error) => {
                enqueueSnackbar({
                    message: `Ocurrio un error: ${error}`,
                    variant: "error",
                    autoHideDuration: 3000,
                });
            });
    }, [category.language, category.restaurant_link]);

    return (
        <Dialog open={open} aria-labelledby="edit-dialog-title">
            <DialogTitle id="edit-dialog-title">
                Editar Categoría Padre
            </DialogTitle>
            <DialogContent>
                <Grid container>
                    <Grid item xs={12}>
                        <FormControl>
                            <InputLabel id="parent-selector-label">
                                Categorías
                            </InputLabel>
                            <Select
                                labelId="parent-selector-label"
                                id="parent-selector"
                                value={formData.parent}
                                name="parent"
                                label="Categoría"
                                onChange={handleChange}
                                sx={{ minWidth: "200px" }}
                                required
                                fullWidth
                            >
                                <MenuItem value={""}>No padre</MenuItem>
                                {allCategories.map((cat) => (
                                    <MenuItem key={cat.category_id} value={cat.category_id}>
                                        {cat.category_name}
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
                                parent: "",
                            });
                            router.push("editar");
                        }}
                        color="error"
                        autoFocus
                    >
                        Cancelar
                    </Button>
                    <Button onClick={handleSubmit} autoFocus>
                        Confirmar
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
}
