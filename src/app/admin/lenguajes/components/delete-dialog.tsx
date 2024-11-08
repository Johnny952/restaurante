import useLoadStore from "@/store/load-store";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import { LanguageType } from "@/lib/models/language";
import { usePathname, useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";

interface DeleteLanguageDialogProps {
    open: boolean;
    language?: LanguageType;
    deleteLanguage: (id: string) => Promise<void | { error: string; status: number }>;
}

export default function DeleteLanguageDialog({
    open,
    language,
    deleteLanguage,
}: DeleteLanguageDialogProps) {
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
                {`Eliminar lenguaje: ${language?.name}`}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    ¿Está seguro de eliminar este lenguaje?
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
                            if (language) {
                                const result = await deleteLanguage(language.id.toString());
                                if (result && 'error' in result) {
                                    throw new Error(result.error);
                                }
                                enqueueSnackbar({
                                    message: `Lenguaje ${language?.name} eliminado`,
                                    variant: "success",
                                })
                            }
                        } catch (error) {
                            enqueueSnackbar({
                                message: `Error al borrar el lenguaje ${language?.name}`,
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