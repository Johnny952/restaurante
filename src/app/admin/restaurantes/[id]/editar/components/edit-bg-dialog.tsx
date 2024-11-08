import { updateBackground } from "@/lib/services/restaurant";
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
import UploaderWithCrop from "@/components/uploader-with-crop";

export default function EditRestaurantBGDialog({
    open,
    id,
    onClose,
    oldBG,
    restaurant,
}: {
    open: boolean;
    id: number;
    onClose: () => void;
    oldBG: string;
    restaurant: string;
}) {
    const [file, setFile] = useState<File | null>(null);
    const setLoading = useLoadStore((state) => state.setLoading);
    const snackSuccess = useSnackStore((state) => state.setOpenSuccess);
    const snackError = useSnackStore((state) => state.setOpenError);

    async function handleSubmit() {
        setLoading(true);
        try {
            const tryAwait = async () => {
                try {
                    await deleteImage(oldBG);
                } catch (error) { }
            };
            let url: string = "";
            if (file) {
                const r = await Promise.all([
                    tryAwait,
                    putImage(file, `restaurant/${restaurant}/logo.png`),
                ]);
                url = r[1];
            }

            await updateBackground(id.toString(), url);
            snackSuccess("Logo actualizado");
            setFile(null);
            onClose();
        } catch (error) {
            snackError(`Ocurrió un error: ${error}`);
        }
        setLoading(false);
    }
    return (
        <Dialog open={open} aria-labelledby="edit-dialog-title">
            <DialogTitle id="edit-dialog-title">Editar fondo</DialogTitle>
            <DialogContent>
                <UploaderWithCrop setCroppedFile={setFile} />
                <DialogActions>
                    <Button
                        onClick={() => {
                            setFile(null);
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
