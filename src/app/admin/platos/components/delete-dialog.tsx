"use client"
import { DishType } from "@/lib/models/dishes";
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

export default function DeleteDialog({
    open,
    dish,
    deleteDish,
}: {
    open: boolean;
    dish: DishType;
    deleteDish: (
        id: string, url: string
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
                {`Eliminar Plato: ${dish.dish_name}`}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    ¿Esta seguro de eliminar este plato?
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
                            await deleteDish(dish?.id.toString() || "", dish?.dish_image || "")
                        } catch (error) {
                            enqueueSnackbar({
                                message: `Error al borrar el plato ${error}`,
                                variant: "error",
                            })
                        }
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
