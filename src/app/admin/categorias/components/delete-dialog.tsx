"use client";
import useLoadStore from "@/store/load-store";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";

export default function DeleteCategoryDialog({
    open,
    selected,
    deleteCategory,
}: {
    open: boolean;
    selected: string | number | null;
    deleteCategory: (
        id: string
    ) => Promise<void | { error: string; status: number }>;
}) {
    const setLoading = useLoadStore((state) => state.setLoading);
    const router = useRouter();
    const pathname = usePathname();

    const onClose = () => {
        router.refresh();
        router.push(pathname);
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {`Eliminar Categoría: ${selected}`}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    ¿Esta seguro de eliminar esta categoría?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="error">
                    Cancelar
                </Button>
                <Button
                    onClick={async () => {
                        setLoading(true);
                        try {
                            const response = await deleteCategory(
                                (selected || "").toString()
                            );
                            if (response && "error" in response) {
                                throw Error(response.error);
                            }
                            enqueueSnackbar({
                                message: `Categoría ${selected} eliminada`,
                                variant: "success",
                            });
                        } catch (error) {
                            enqueueSnackbar({
                                message: `Error al borrar la categoría ${selected}`,
                                variant: "error",
                            });
                        }
                        setLoading(false);
                        onClose();
                    }}
                    autoFocus
                >
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    );
}
