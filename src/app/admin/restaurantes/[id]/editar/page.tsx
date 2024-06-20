"use client";
import LinkBreadcrumbs from "@/components/link-breadcrumbs";
import { Box, Button, Divider, Grid, Paper, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { RestauranteInterface } from "@/app/api/restaurantes/index.types";
import useLoadStore from "@/store/load-store";
import useSnackStore from "@/store/snackbar-store";
import { getRestauranteByID } from "@/app/api/restaurantes/get-restaurante";
import { ImageAsync } from "@/components/image-async";
import EditRestauranteNameDialog from "./components/edit-restaurant-name";
import EditRestauranteLogoDialog from "./components/edit-restaurant-logo";

const breadcrumbs = [
    {
        name: "Home",
        link: "/admin",
    },
    {
        name: "Restaurantes",
        link: "/admin/restaurantes",
    },
    {
        name: "Editar",
    },
];

export default function EditRestaurantePage({
    params: { id },
    searchParams: { editName, editLogo },
}: {
    params: { id: string };
    searchParams: {
        editName?: string;
        editLogo?: string;
    };
}) {
    const [oldData, setOldData] = useState<RestauranteInterface | null>(null);
    const router = useRouter();
    const pathname = usePathname();

    const setLoading = useLoadStore((state) => state.setLoading);
    const snackError = useSnackStore((state) => state.setOpenError);

    const goBack = () => {
        router.push("/admin/restaurantes");
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            return getRestauranteByID(id);
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
    }, [id, editName, editLogo]);

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
                        <Typography variant="h6">{`Editar restaurante: ${oldData?.name}`}</Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Grid container>
                            <Grid item xs={12} md={6}>
                                <Typography variant="body1">
                                    Nombre: {oldData?.name}
                                </Typography>
                                <Typography variant="body1">
                                    Link: {oldData?.link}
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
                                        sx={{ my: "10px" }}
                                        variant="contained"
                                        onClick={() =>
                                            router.push(
                                                `${pathname}?editName=1`
                                            )
                                        }
                                    >
                                        Cambiar
                                    </Button>
                                    <EditRestauranteNameDialog
                                        id={id}
                                        open={Boolean(editName)}
                                        onClose={() => router.push(pathname)}
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <Divider />
                    </Grid>

                    <Grid item xs={12}>
                        <Grid container>
                            <Grid item xs={12} md={6}>
                                <Box height={300} width={300}>
                                    <ImageAsync
                                        alt="logo"
                                        src={oldData?.image || ""}
                                        loadingImg={
                                            !oldData?.image ||
                                            oldData.image === ""
                                        }
                                        sizes="100vw"
                                        width="100"
                                        height="100"
                                        style={{
                                            width: "100%",
                                            height: "auto",
                                        }}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    sx={{ height: "100%" }}
                                >
                                    <Box flexGrow={1} />
                                    <Button
                                        sx={{ my: "10px" }}
                                        variant="contained"
                                        onClick={() =>
                                            router.push(
                                                `${pathname}?editLogo=1`
                                            )
                                        }
                                    >
                                        Cambiar
                                    </Button>
                                    <EditRestauranteLogoDialog
                                        open={Boolean(editLogo)}
                                        id={id}
                                        onClose={() => router.push(pathname)}
                                        oldLink={oldData?.link || ""}
                                        restaurant={oldData?.link || ""}
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
