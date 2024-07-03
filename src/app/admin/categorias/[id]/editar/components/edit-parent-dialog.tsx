import useLoadStore from "@/store/load-store";
import useSnackStore from "@/store/snackbar-store";
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
import { getAllParents, getById } from "@/app/api/categories/get";
import { notFound } from "next/navigation";
import { updateParent } from "@/app/api/categories/update";
import { CategoryTable } from "@/app/api/categories/index.types";

interface FormData {
    parent: string;
}

export default function EditParentDialog({
    open,
    id,
    onClose,
}: {
    open: boolean;
    id: string;
    onClose: () => void;
}) {
    const [formData, setFormData] = useState<FormData>({
        parent: "",
    });
    const [allCategories, setAllCategories] = useState<
        { id: string; name: string }[]
    >([]);
    const [category, setCategory] = useState<
        (CategoryTable & { restlang: string }) | undefined
    >();
    const setLoading = useLoadStore((state) => state.setLoading);
    const snackSuccess = useSnackStore((state) => state.setOpenSuccess);
    const snackError = useSnackStore((state) => state.setOpenError);

    const handleChange = async (e: SelectChangeEvent) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (!category) {
            notFound();
        }
        setLoading(true);
        try {
            await updateParent(id, formData.parent);
            setFormData({
                parent: "",
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
            const cat = await getById(id);
            if (!cat) {
                notFound();
            }
            const categories = await getAllParents(cat.restlang, id);
            return {
                categories,
                category: cat,
            };
        };

        fetchData()
            .then(({ categories, category: cat }) => {
                setAllCategories(categories);
                setCategory(cat);
            })
            .catch((error) => {
                snackError(`Ocurrió un error: ${error.toString()}`);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, onClose]);

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
                                    <MenuItem key={cat.id} value={cat.id}>
                                        {cat.name}
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
                            onClose();
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
