import { getAllLanguages } from "@/app/api/languages/get-languages";
import { updateRestLangLanguage } from "@/app/api/restaurantes-languages/update";
import useLoadStore from "@/store/load-store";
import useSnackStore from "@/store/snackbar-store";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    InputLabel,
    MenuItem,
    Select,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function EditLanguageDialog({
    open,
    id,
    onClose,
}: {
    open: boolean;
    id: string;
    onClose: () => void;
}) {
    const [languageValue, setLanguageValue] = useState("");
    const [allLanguages, setAllLanguages] = useState<
        { id: string; name: string }[]
    >([]);
    const setLoading = useLoadStore((state) => state.setLoading);
    const snackSuccess = useSnackStore((state) => state.setOpenSuccess);
    const snackError = useSnackStore((state) => state.setOpenError);

    async function onConfirmLanguage() {
        setLoading(true);
        try {
            await updateRestLangLanguage(id, languageValue);
            snackSuccess("Lenguaje cambiado");
            setLanguageValue("");
            onClose();
        } catch (error) {
            snackError(`Ocurrió un error: ${error}`);
        }
        setLoading(false);
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            return getAllLanguages();
        };

        fetchData()
            .then((restaurants) => {
                setAllLanguages(restaurants);
                setLoading(false);
            })
            .catch((error) => {
                snackError(`Ocurrió un error: ${error.toString()}`);
                setLoading(false);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Dialog open={open} aria-labelledby="edit-language-title">
            <DialogTitle id="edit-language-title">Editar Lenguaje</DialogTitle>
            <DialogContent>
                <InputLabel id="language-selector-label">Lenguaje</InputLabel>
                <Select
                    labelId="language-selector-label"
                    id="language-selector"
                    value={languageValue}
                    label="Restaurante"
                    onChange={(e) => setLanguageValue(e.target.value)}
                >
                    {allLanguages.map((rest) => (
                        <MenuItem key={rest.id} value={rest.id}>
                            {rest.name}
                        </MenuItem>
                    ))}
                </Select>
                <DialogActions>
                    <Button
                        onClick={() => {
                            setLanguageValue("");
                            onClose();
                        }}
                        color="error"
                        autoFocus
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={onConfirmLanguage}
                        autoFocus
                        disabled={languageValue === ""}
                    >
                        Confirmar
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
}
