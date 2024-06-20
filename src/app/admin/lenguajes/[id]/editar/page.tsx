"use client";
import LinkBreadcrumbs from "@/components/link-breadcrumbs";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useLoadStore from "@/store/load-store";
import useSnackStore from "@/store/snackbar-store";
import EditNameDialog from "./components/edit-name-dialog";
import { LanguageTableInterface } from "@/app/api/languages/index.types";
import { getLanguage } from "@/app/api/languages/get-languages";
import EditIDDialog from "./components/edit-id-dialog";

const breadcrumbs = [
    {
        name: "Home",
        link: "/admin",
    },
    {
        name: "Lenguajes",
        link: "/admin/lenguajes",
    },
    {
        name: "Editar",
    },
];

export default function EditLanguagePage({
    params: { id },
    searchParams: { editName, editID },
}: {
    params: { id: string };
    searchParams: {
        editName?: string;
        editID?: string;
    };
}) {
    const [oldData, setOldData] = useState<LanguageTableInterface | null>(null);
    const router = useRouter();
    const pathname = usePathname();

    const setLoading = useLoadStore((state) => state.setLoading);
    const snackError = useSnackStore((state) => state.setOpenError);
    3;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            return getLanguage(id);
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
    }, [id, editName, editID]);

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
                            onClick={() => router.push("/admin/lenguajes")}
                        >
                            Atrás
                        </Button>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="h6">{`Editar Lenguaje: ${oldData?.name}`}</Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Grid container rowSpacing={2}>
                            <Grid item xs={12} md={6}>
                                <Typography variant="body1">
                                    ID: {oldData?.id}
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
                                            router.push(`${pathname}?editID=1`)
                                        }
                                    >
                                        Cambiar
                                    </Button>
                                    <EditIDDialog
                                        id={id}
                                        open={Boolean(editID)}
                                        onClose={(newID: string) =>
                                            router.push(
                                                `/admin/lenguajes/${newID}/editar`
                                            )
                                        }
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="body1">
                                    Nombre: {oldData?.name}
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
                                                `${pathname}?editName=1`
                                            )
                                        }
                                    >
                                        Cambiar
                                    </Button>
                                    <EditNameDialog
                                        id={id}
                                        open={Boolean(editName)}
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
