"use client";
import LinkBreadcrumbs from "@/components/link-breadcrumbs";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useLoadStore from "@/store/load-store";
import useSnackStore from "@/store/snackbar-store";
import { RestauranteLanguageInterface } from "@/app/api/restaurantes-languages/index.types";
import { getRestLang } from "@/app/api/restaurantes-languages/get-restaurantes-languages";
import EditRestaurantDialog from "./components/edit-restaurant-dialog";
import EditLanguageDialog from "./components/edit-language-dialog";

const breadcrumbs = [
    {
        name: "Home",
        link: "/admin",
    },
    {
        name: "Restaurantes",
        link: "/admin/restaurantes-lenguajes",
    },
    {
        name: "Editar",
    },
];

export default function EditRestaurantePage({
    params: { id },
    searchParams: { editRestaurant, editLanguage },
}: {
    params: { id: string };
    searchParams: {
        editRestaurant?: string;
        editLanguage?: string;
    };
}) {
    const [oldData, setOldData] = useState<RestauranteLanguageInterface | null>(
        null
    );
    const router = useRouter();
    const pathname = usePathname();

    const setLoading = useLoadStore((state) => state.setLoading);
    const snackError = useSnackStore((state) => state.setOpenError);

    const goBack = () => {
        router.push("/admin/restaurantes-lenguajes");
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            return getRestLang(id);
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, editRestaurant, editLanguage]);

    return (
        <div>
            <LinkBreadcrumbs breadcrumbs={breadcrumbs} />

            <Paper
                elevation={0}
                sx={{
                    mt: "20px",
                    p: "20px",
                    border: "1px solid rgba(0, 0, 0, 0.12)",
                    color: "rgb(114, 119, 122)",
                }}
            >
                <Grid container rowSpacing={2}>
                    <Grid item xs={12}>
                        <Button
                            variant="text"
                            startIcon={<ArrowBackIcon />}
                            onClick={goBack}
                        >
                            Atrás
                        </Button>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="h6">
                            Editar lenguage de restaurante
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Grid container rowSpacing={2}>
                            <Grid item xs={12} md={6}>
                                <Typography variant="body1">
                                    Lenguaje: {oldData?.lang_name}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    sx={{ height: "100%" }}
                                >
                                    <Box flexGrow={1} />
                                    <Button
                                        variant="contained"
                                        onClick={() =>
                                            router.push(
                                                `${pathname}?editLanguage=1`
                                            )
                                        }
                                    >
                                        Cambiar
                                    </Button>
                                    <EditLanguageDialog
                                        id={id}
                                        open={Boolean(editLanguage)}
                                        onClose={() => router.push(pathname)}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="body1">
                                    Restaurante: {oldData?.rest_name}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    sx={{ height: "100%" }}
                                >
                                    <Box flexGrow={1} />
                                    <Button
                                        variant="contained"
                                        onClick={() =>
                                            router.push(
                                                `${pathname}?editRestaurant=1`
                                            )
                                        }
                                    >
                                        Cambiar
                                    </Button>
                                    <EditRestaurantDialog
                                        id={id}
                                        open={Boolean(editRestaurant)}
                                        onClose={() => router.push(pathname)}
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}
