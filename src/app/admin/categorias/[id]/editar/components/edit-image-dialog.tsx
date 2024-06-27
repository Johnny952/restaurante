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
import { useEffect, useState } from "react";
import { CategoryTable } from "@/app/api/categories/index.types";
import { notFound } from "next/navigation";
import { getCategoryById } from "@/app/api/categories/get-categories";
import UploaderWithCrop from "@/components/uploader-with-crop";
import { updateImage } from "@/app/api/categories/update";

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
    const [category, setCategory] = useState<
        | (CategoryTable & { restlang: string; restaurant_link: string })
        | undefined
    >();
    const setLoading = useLoadStore((state) => state.setLoading);
    const snackSuccess = useSnackStore((state) => state.setOpenSuccess);
    const snackError = useSnackStore((state) => state.setOpenError);

    useEffect(() => {
        const fetchData = async () => {
            return getCategoryById(id);
        };

        fetchData()
            .then((cat) => {
                setCategory(cat);
            })
            .catch((error) => {
                snackError(`Ocurrió un error: ${error.toString()}`);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, onClose]);

    async function handleSubmit() {
        if (!category) {
            notFound();
        }
        if (file) {
            setLoading(true);
            try {
                const tryAwait = async () => {
                    try {
                        await deleteImage(category.image);
                    } catch (error) {}
                };
                const [_, url] = await Promise.all([
                    tryAwait,
                    putImage(
                        file,
                        `restaurante/${category.restaurant_link}/categories/${category.link}.png`
                    ),
                ]);

                await updateImage(id, url);
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
