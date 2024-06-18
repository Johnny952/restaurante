import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Tab,
    Tabs,
    TextField,
} from "@mui/material";
import Uploader from "./uploader";
import { ChangeEvent, useEffect, useState } from "react";
import toKebabCase from "@/helpers/to-kebab-case";
import useLoadStore from "@/store/load-store";
import useSnackStore from "@/store/snackbar-store";
import { updateRestauranteLogo, updateRestauranteName } from "@/app/api/restaurantes/updateRestaurante";
import { putImage } from "@/app/api/upload/put-image";
import { deleteImage } from "@/app/api/upload/delete-image";
import { getRestauranteByID } from "@/app/api/restaurantes/get-restaurante";
import { RestauranteInterface } from "@/app/api/restaurantes/index.types";

export default function EditRestauranteDialog({
    open,
    onClose,
    selected,
}: {
    open: boolean;
    onClose: () => void;
    selected: string | number | null;
}) {
    const [nameValue, setNameValue] = useState("");
    const [linkValue, setLinkValue] = useState("");
    const [logoValue, setLogoValue] = useState("");
    const [oldData, setOldData] = useState<RestauranteInterface | null>(null)
    const [file, setfile] = useState<File | null>(null);
    const [selectedTab, setSelectedTab] = useState(0);

    const emptyStore = () => {
        setLogoValue("");
        setNameValue("");
        setLinkValue("");
        setOldData(null);
    }

    const setLoading = useLoadStore((state) => state.setLoading);
    const snackSuccess = useSnackStore((state) => state.setOpenSuccess);
    const snackError = useSnackStore((state) => state.setOpenError);

    function onNameValueChange(
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        setNameValue(event.target.value);
        setLinkValue(toKebabCase(event.target.value));
    }

    useEffect(() => {
        if (selected && selected !== '') {
            const fetchData = async () => {
                setLoading(true)
                return getRestauranteByID((selected || "").toString());
            }

            fetchData()
                .then((data) => {
                    setOldData(data)
                    setLoading(false)
                })
                .catch((error) => {
                    snackError(`Ocurrió un error: ${error.toString()}`);
                    setLoading(false);
                })
        }
    }, [selected])

    async function onConfirmName() {
        setLoading(true)
        try {
            await updateRestauranteName(selected?.toString() || "", nameValue, linkValue)
            snackSuccess('Nombre de restaurante cambiado')
            emptyStore()
            onClose()
        } catch (error) {
            snackError(`Ocurrió un error: ${error}`);
        }
        setLoading(false)
    }

    async function onConfirmLogo() {
        if (file) {
            setLoading(true);
            try {
                const url = await putImage(
                    file,
                    `restaurante/${oldData?.link}/logo.png`,
                );

                if (oldData && oldData.image) {
                    await deleteImage(oldData?.image)
                }

                await updateRestauranteLogo((selected || "").toString(), url);
                snackSuccess("Logo actualizado");
                emptyStore()
                onClose()
            } catch (error) {
                snackError(`Ocurrió un error: ${error}`);
            }
            setLoading(false);
        } else {
            snackError('Ninguna imagen seleccionada');
        }
    }

    return (
        <Dialog open={open} aria-labelledby="edit-dialog-title">
            <DialogTitle id="edit-dialog-title">
                {`Editar restaurante ${selected}`}
            </DialogTitle>
            <DialogContent>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs
                        value={selectedTab}
                        onChange={(event, newValue) => setSelectedTab(newValue)}
                    >
                        <Tab
                            label="Editar Nombre"
                            id="edit-name-tab-0"
                            aria-controls="edit-name-panel-0"
                        />
                        <Tab
                            label="Editar Logo"
                            id="edit-name-tab-1"
                            aria-controls="edit-name-panel-1"
                        />
                    </Tabs>
                </Box>
                <div
                    role="tabpanel"
                    hidden={selectedTab !== 0}
                    id={"edit-name-panel-0"}
                    aria-labelledby={"edit-name-tab-0"}
                >
                    {selectedTab === 0 && (
                        <Box>
                            <TextField
                                label="Nuevo Nombre"
                                variant="standard"
                                value={nameValue}
                                onChange={onNameValueChange}
                                placeholder={oldData?.name}
                                fullWidth
                                required
                            />
                            <TextField
                                label="Link"
                                variant="standard"
                                value={linkValue}
                                placeholder={oldData?.link}
                                disabled
                                fullWidth
                                required
                            />
                            <Button sx={{ my: "10px" }} variant="contained" onClick={onConfirmName}>
                                Actualizar
                            </Button>
                        </Box>
                    )}
                </div>
                <div
                    role="tabpanel"
                    hidden={selectedTab !== 1}
                    id={"edit-name-panel-1"}
                    aria-labelledby={"edit-name-tab-1"}
                >
                    {selectedTab === 1 && (
                        <Box sx={{ p: 3 }}>
                            <Uploader
                                linkValue={(selected || "").toString()}
                                setLogoValue={setLogoValue}
                                logoValue={logoValue}
                                setFile={setfile}
                            />
                            <Button sx={{ my: "10px" }} variant="contained" onClick={onConfirmLogo}>
                                Actualizar
                            </Button>
                        </Box>
                    )}
                </div>
                <DialogActions>
                    <Button onClick={() => {
                        emptyStore()
                        onClose()
                    }} autoFocus>
                        Finalizar
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
}
