import { updateRestaurant } from "@/app/api/restaurants-languages/update";
import { getAll as getAllRestaurants } from "@/app/api/restaurants/get";
import useLoadStore from "@/store/load-store";
import useSnackStore from "@/store/snackbar-store";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function EditRestaurantDialog({
    open,
    id,
    onClose,
}: {
    open: boolean;
    id: string;
    onClose: () => void;
}) {
    const [restaurantValue, setRestaurantValue] = useState("");
    const [allRestaurants, setAllRestaurants] = useState<
        { id: string; name: string }[]
    >([]);
    const setLoading = useLoadStore((state) => state.setLoading);
    const snackSuccess = useSnackStore((state) => state.setOpenSuccess);
    const snackError = useSnackStore((state) => state.setOpenError);

    async function onConfirmRestaurant() {
        setLoading(true);
        try {
            await updateRestaurant(id, restaurantValue);
            snackSuccess("Restaurante cambiado");
            setRestaurantValue("");
            onClose();
        } catch (error) {
            snackError(`Ocurrió un error: ${error}`);
        }
        setLoading(false);
    }

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
        <Dialog open={open} aria-labelledby="edit-restaurant-title">
            <DialogTitle id="edit-restaurant-title">
                Editar Restaurante
            </DialogTitle>
            <DialogContent>
                <FormControl sx={{ width: '100%' }}>
                    <InputLabel id="restaurant-selector-label">
                        Restaurante
                    </InputLabel>
                    <Select
                        labelId="restaurant-selector-label"
                        id="restaurant-selector"
                        value={restaurantValue}
                        label="Restaurante"
                        fullWidth
                        onChange={(e) => setRestaurantValue(e.target.value)}
                    >
                        {allRestaurants.map((rest) => (
                            <MenuItem key={rest.id} value={rest.id}>
                                {rest.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <DialogActions>
                    <Button
                        onClick={() => {
                            setRestaurantValue("");
                            onClose();
                        }}
                        color="error"
                        autoFocus
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={onConfirmRestaurant}
                        autoFocus
                        disabled={restaurantValue === ""}
                    >
                        Confirmar
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
}
