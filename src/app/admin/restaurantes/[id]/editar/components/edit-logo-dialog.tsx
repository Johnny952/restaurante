import { updateLogo } from "@/lib/services/restaurant";
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

export default function EditRestaurantLogoDialog({
    open,
    id,
    onClose,
    oldLogo,
    restaurant,
}: {
    open: boolean;
    id: number;
    onClose: () => void;
    oldLogo: string;
    restaurant: string;
}) {
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
                        await deleteImage(oldLogo);
                    } catch (error) { }
                };
                const [_, url] = await Promise.all([
                    tryAwait,
                    putImage(file, `restaurant/${restaurant}/logo.png`),
                ]);

                await updateLogo(id.toString(), url);
                snackSuccess("Logo actualizado");
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
            <DialogTitle id="edit-dialog-title">Editar Logo</DialogTitle>
            <DialogContent>
                <Uploader setFile={setfile} />
                <DialogActions>
                    <Button
                        onClick={() => {
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
                        disabled={file === null}
                    >
                        Confirmar
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
}
