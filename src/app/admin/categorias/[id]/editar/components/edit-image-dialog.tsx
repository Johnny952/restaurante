"use client";
import { deleteImage } from "@/app/api/upload/delete-image";
import { putImage } from "@/app/api/upload/put-image";
import useLoadStore from "@/store/load-store";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import { useState } from "react";
import { notFound, useRouter } from "next/navigation";
import UploaderWithCrop from "@/components/uploader-with-crop";
import { CategoryType } from "@/lib/models/categories";
import { enqueueSnackbar } from "notistack";
import { updateImage } from "@/lib/services/category";

export default function EditImageDialog({
    open,
    id,
    category,
}: {
    open: boolean;
    id: string;
    category: CategoryType;
}) {
    const [file, setfile] = useState<File | null>(null);
    const setLoading = useLoadStore((state) => state.setLoading);
    const router = useRouter();

    async function handleSubmit() {
        if (!category) {
            notFound();
        }
        if (file) {
            setLoading(true);
            try {
                const tryAwait = async () => {
                    if (!category.category_image) {
                        return;
                    }
                    try {
                        await deleteImage(category.category_image);
                    } catch (error) { }
                };
                const [_, url] = await Promise.all([
                    tryAwait,
                    putImage(
                        file,
                        `restaurante/${category.restaurant_link}/categories/${category.category_link}.png`
                    ),
                ]);

                await updateImage(id, url);
                enqueueSnackbar({
                    message: "Imagen actualizada",
                    variant: "success",
                });
                setfile(null);
                router.push("editar");
                router.refresh();
            } catch (error) {
                enqueueSnackbar({
                    message: "Ocurrio un error al subir la imagen",
                    variant: "error",
                });
            }
            setLoading(false);
        } else {
            enqueueSnackbar({
                message: "Ninguna imagen seleccionada",
                variant: "error",
            });
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
                            router.push("editar");
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
