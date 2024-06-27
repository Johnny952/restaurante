import { updatePrice } from "@/app/api/dishes/update";
import { updateRestauranteName } from "@/app/api/restaurantes/update-restaurante";
import formatPrice from "@/helpers/format-price";
import toKebabCase from "@/helpers/to-kebab-case";
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
    Input,
    InputLabel,
    SelectChangeEvent,
    TextField,
} from "@mui/material";
import { ChangeEvent, useState } from "react";

interface FormData {
    price: string;
}

interface FormErrors {
    price?: string;
}

export default function EditPriceDialog({
    open,
    id,
    onClose,
}: {
    open: boolean;
    id: string;
    onClose: () => void;
}) {
    const [formData, setFormData] = useState<FormData>({
        price: "",
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const setLoading = useLoadStore((state) => state.setLoading);
    const snackSuccess = useSnackStore((state) => state.setOpenSuccess);
    const snackError = useSnackStore((state) => state.setOpenError);

    const validateForm = () => {
        let newErrors: FormErrors = {};

        if (!formData.price) newErrors.price = "El precio es requerido";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = async (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        const regex = /^[0-9]*$/;
        const deformattedValue = value.replaceAll(".", "");
        if (regex.test(deformattedValue) || deformattedValue === "") {
            const formattedValue = deformattedValue
                ? formatPrice(parseInt(deformattedValue, 10)).slice(1)
                : "";
            setFormData({ ...formData, [name]: formattedValue });
        }
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            snackError("Formulario con errores");
            return;
        }
        setLoading(true);
        try {
            await updatePrice(id, formData.price.replaceAll(".", ""));
            setFormData({
                price: "",
            });
            setErrors({});
            onClose();
            snackSuccess("Precio cambiado");
        } catch (error) {
            snackError(`Ocurrió un error: ${error}`);
        }
        setLoading(false);
    };

    return (
        <Dialog open={open} aria-labelledby="edit-dialog-title">
            <DialogTitle id="edit-dialog-title">Editar Precio</DialogTitle>
            <DialogContent>
                <FormControl error={!!errors.price} fullWidth>
                    <InputLabel htmlFor="price-input">Precio</InputLabel>
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
                <DialogActions>
                    <Button
                        onClick={() => {
                            setFormData({
                                price: "",
                            });
                            setErrors({});
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
