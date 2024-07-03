import { del } from "@/app/api/restaurants/delete";
import { getByID } from "@/app/api/restaurants/get";
import { RestaurantInterface } from "@/app/api/restaurants/index.types";
import { deleteImage } from "@/app/api/upload/delete-image";
import useLoadStore from "@/store/load-store";
import useSnackStore from "@/store/snackbar-store";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function DeleteRestauranteDialog({
    open,
    onClose,
    selected,
}: {
    open: boolean;
    onClose: () => void;
    selected: string | number | null;
}) {
    const setLoading = useLoadStore((state) => state.setLoading);
    const snackSuccess = useSnackStore((state) => state.setOpenSuccess);
    const snackError = useSnackStore((state) => state.setOpenError);
    const [oldData, setOldData] = useState<RestaurantInterface | null>(null);

    async function tryDeleteImg(img: string | undefined | null) {
        if (img) {
            deleteImage(img);
        }
    }

    useEffect(() => {
        if (selected && selected !== "") {
            const fetchData = async () => {
                setLoading(true);
                return getByID((selected || "").toString());
            };

            fetchData()
                .then((data) => {
                    setOldData(data);
                    setLoading(false);
                })
                .catch((error) => {
                    snackError(`Ocurrió un error: ${error.toString()}`);
                    setLoading(false);
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selected]);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {`Eliminar restaurante ${selected}`}
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
                            await Promise.all([
                                tryDeleteImg(oldData?.image),
                                tryDeleteImg(oldData?.background),
                                del((selected || "").toString()),
                            ]);
                            snackSuccess(`Restaurante ${selected} eliminado`);
                        } catch (error) {
                            snackError(`Ocurrió un error: ${error}`);
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
