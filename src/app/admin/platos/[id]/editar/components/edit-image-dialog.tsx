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
import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import UploaderWithCrop from "@/components/uploader-with-crop";
// import { DishTable } from "@/app/api/dishes/index.types";
// import { getById } from "@/app/api/dishes/get";
import { generateDishLink } from "@/app/api/helpers/image-links";
import { DishType } from "@/lib/models/dishes";
// import { updateImage } from "@/app/api/dishes/update";

export default function EditImageDialog({
    open,
    id,
    onClose,
}: {
    open: boolean;
    id: string;
    onClose: () => void;
}) {
    const [file, setfile] = useState<File | null>(null);
    const [dish, setDish] = useState<DishType | null>(null);
    const setLoading = useLoadStore((state) => state.setLoading);
    const snackSuccess = useSnackStore((state) => state.setOpenSuccess);
    const snackError = useSnackStore((state) => state.setOpenError);

    useEffect(() => {
        const fetchData = async () => {
            // return getById(id);
        };

        fetchData()
            .then((cat) => {
                setDish(null);
            })
            .catch((error) => {
                snackError(`Ocurrió un error: ${error.toString()}`);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, onClose]);

    async function handleSubmit() {
        if (!dish) {
            notFound();
        }
        if (file) {
            setLoading(true);
            try {
                const tryAwait = async () => {
                    try {
                        await deleteImage(dish?.dish_image || "");
                    } catch (error) { }
                };
                const [_, url] = await Promise.all([
                    tryAwait,
                    putImage(
                        file,
                        generateDishLink(dish?.restaurant_id.toString(), dish?.id.toString())
                    ),
                ]);

                // await updateImage(id, url);
                snackSuccess("Imagen actualizada");
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
        <Dialog open={open} aria-labelledby="edit-dialog-image">
            <DialogTitle id="edit-dialog-image">Editar Imagen</DialogTitle>
            <DialogContent>
                <UploaderWithCrop setCroppedFile={setfile} />
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
                    <Button onClick={handleSubmit} autoFocus disabled={!file}>
                        Confirmar
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
}
