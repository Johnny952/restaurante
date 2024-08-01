"use client";
import useLoadStore from "@/store/load-store";
import useSnackStore from "@/store/snackbar-store";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@mui/material";
import { ChangeEvent, useState } from "react";

interface AddMapDioalogProps {
    open: boolean;
    handleClose: () => void;
    handleAddMap?: (
        name: string,
        height: number,
        width: number,
        callback: () => void
    ) => void;
}

export default function AddMapDialog({
    open,
    handleClose,
    handleAddMap = () => {},
}: AddMapDioalogProps) {
    const [value, setValue] = useState<string>("");
    const [height, setHeight] = useState<number>(2000);
    const [width, setWidth] = useState<number>(2000);
    const snackError = useSnackStore((state) => state.setOpenError);

    const handleValueChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setValue(event.target.value);
    };

    const handleHeightChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const val = event.target.value.match(/\d+/);
        const v = val ? val.join("") : "0";
        setHeight(parseInt(v, 10));
    };

    const handleWidthChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const val = event.target.value.match(/\d+/);
        const v = val ? val.join("") : "0";
        setWidth(parseInt(v, 10));
    };

    const handleConfirm = async () => {
        if (value) {
            handleAddMap(value, height, width, () => {
                setValue("");
                setHeight(2000);
                setWidth(2000);
            });
        } else {
            snackError("El nombre del mapa no puede estar vacío");
        }
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Agregar nuevo mapa</DialogTitle>
            <DialogContent>
                <TextField
                    label="Nombre"
                    variant="standard"
                    value={value}
                    name="name"
                    onChange={handleValueChange}
                    fullWidth
                    required
                />

                <TextField
                    label="Ancho"
                    variant="standard"
                    value={width}
                    name="width"
                    onChange={handleWidthChange}
                    fullWidth
                    required
                />

                <TextField
                    label="Alto"
                    variant="standard"
                    value={height}
                    name="height"
                    onChange={handleHeightChange}
                    fullWidth
                    required
                />
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => {
                        handleClose();
                        setValue("");
                        setHeight(2000);
                        setWidth(2000);
                    }}
                    color="error"
                    autoFocus
                >
                    Cancelar
                </Button>
                <Button
                    onClick={handleConfirm}
                    autoFocus
                    disabled={value === ""}
                >
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    );
}
