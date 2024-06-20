import { updateRestauranteLogo } from "@/app/api/restaurantes/update-restaurante";
import { deleteImage } from "@/app/api/upload/delete-image";
import { putImage } from "@/app/api/upload/put-image";
import useLoadStore from "@/store/load-store";
import useSnackStore from "@/store/snackbar-store";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import { useState } from "react";
import Uploader from "../../../../../../components/uploader";

export default function EditRestauranteLogoDialog({
    open,
    id,
    onClose,
    oldLink,
    restaurant,
}: {
    open: boolean;
    id: string;
    onClose: () => void;
    oldLink: string;
    restaurant: string;
}) {
    const [logoValue, setLogoValue] = useState("");
    const [file, setfile] = useState<File | null>(null);
    const setLoading = useLoadStore((state) => state.setLoading);
    const snackSuccess = useSnackStore((state) => state.setOpenSuccess);
    const snackError = useSnackStore((state) => state.setOpenError);

    async function onConfirmLogo() {
        if (file) {
            setLoading(true);
            try {
                const tryAwait = async () => {
                    try {
                        await deleteImage(oldLink);
                    } catch (error) {}
                };
                const [_, url] = await Promise.all([
                    tryAwait,
                    putImage(file, `restaurante/${restaurant}/logo.png`),
                ]);

                await updateRestauranteLogo(id, url);
                snackSuccess("Logo actualizado");
                setLogoValue("");
                setfile(null);
                onClose();
            } catch (error) {
                snackError(`Ocurrió un error: ${error}`);
            }
            setLoading(false);
        } else {
            snackError("Ninguna imagen seleccionada");
        }
    }
    return (
        <Dialog open={open} aria-labelledby="edit-dialog-title">
            <DialogTitle id="edit-dialog-title">Editar nombre/link</DialogTitle>
            <DialogContent>
                <Uploader setFile={setfile} />
                <DialogActions>
                    <Button
                        onClick={() => {
                            setLogoValue("");
                            setfile(null);
                            onClose();
                        }}
                        color="error"
                        autoFocus
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={onConfirmLogo}
                        autoFocus
                        disabled={logoValue === ""}
                    >
                        Confirmar
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
}
