import { deleteImage } from "@/app/api/upload/delete-image";
import { RestaurantType } from "@/lib/models/restaurant";
import useLoadStore from "@/store/load-store";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { usePathname, useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";

export default function DeleteDialog({
    open,
    restaurant,
    deleteRestaurant,
}: {
    open: boolean;
    restaurant?: RestaurantType;
    deleteRestaurant: (
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
                {`Eliminar restaurante ${restaurant?.name}`}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    ¿Esta seguro de eliminar este restaurante?
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
                            let promises = [
                                deleteImage(restaurant?.logo || ""),
                                deleteRestaurant(restaurant?.id.toString() || ""),
                            ]
                            if (restaurant?.background_image) {
                                promises.push(deleteImage(restaurant?.background_image || ""));
                            }
                            const responses = await Promise.all(promises);
                            if (responses[2] && "error" in responses[2]) {
                                throw Error(responses[2].error);
                            }
                            enqueueSnackbar({
                                message: `Restaurante ${restaurant?.name} eliminado`,
                                variant: "success",
                            })
                        } catch (error) {
                            enqueueSnackbar({
                                message: `Error al borrar el restaurante ${restaurant?.name}`,
                                variant: "error",
                            })
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
