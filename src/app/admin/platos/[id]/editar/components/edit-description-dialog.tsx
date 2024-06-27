import { updateDescription } from "@/app/api/dishes/update";
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
    TextField,
} from "@mui/material";
import { ChangeEvent, useState } from "react";

interface FormData {
    description: string;
}

export default function EditDescriptionDialog({
    open,
    id,
    onClose,
}: {
    open: boolean;
    id: string;
    onClose: () => void;
}) {
    const [formData, setFormData] = useState<FormData>({
        description: "",
    });
    const setLoading = useLoadStore((state) => state.setLoading);
    const snackSuccess = useSnackStore((state) => state.setOpenSuccess);
    const snackError = useSnackStore((state) => state.setOpenError);


    const handleChange = async (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await updateDescription(
                id,
                formData.description,
            )
            setFormData({
                description: "",
            })
            onClose();
            snackSuccess("Descripción cambiada");
        } catch (error) {
            snackError(`Ocurrió un error: ${error}`);
        }
        setLoading(false);
    };

    return (
        <Dialog open={open} aria-labelledby="edit-dialog-title">
            <DialogTitle id="edit-dialog-title">Editar Descripción</DialogTitle>
            <DialogContent>
                <InputLabel htmlFor="description-input">
                    Descripción
                </InputLabel>
                <FormControl fullWidth>
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
                </FormControl>
                <DialogActions>
                    <Button
                        onClick={() => {
                            setFormData({
                                description: "",
                            })
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
