"use client";
import LinkBreadcrumbs from "@/components/link-breadcrumbs";
import {
    Box,
    Button,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useState } from "react";
import useLoadStore from "@/store/load-store";
import useSnackStore from "@/store/snackbar-store";
import { useRouter } from "next/navigation";
import { getAllRestaurants } from "@/app/api/restaurantes/get-restaurante";
import { getAllLanguages } from "@/app/api/languages/get-languages";
import { putRestLang } from "@/app/api/restaurantes-languages/put";

const breadcrumbs = [
    {
        name: "Home",
        link: "/admin",
    },
    {
        name: "Restaurantes-Lenguajes",
        link: "/admin/restaurantes-lenguajes",
    },
    {
        name: "Agregar",
    },
];

export default function AddRestLanguagePage() {
    const [restaurant, setRestaurant] = useState("");
    const [language, setLanguage] = useState("");

    const [allRestaurants, setAllRestaurants] = useState<
        { id: string; name: string }[]
    >([]);
    const [allLanguages, setAlLanguages] = useState<
        { id: string; name: string }[]
    >([]);
    const router = useRouter();

    const setLoading = useLoadStore((state) => state.setLoading);
    const snackSuccess = useSnackStore((state) => state.setOpenSuccess);
    const snackError = useSnackStore((state) => state.setOpenError);

    const goBack = () => {
        router.push("/admin/restaurantes-lenguajes");
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            return Promise.all([getAllRestaurants(), getAllLanguages()]);
        };

        fetchData()
            .then(([restaurants, languages]) => {
                setAllRestaurants(restaurants);
                setAlLanguages(languages);
                setLoading(false);
            })
            .catch((error) => {
                snackError(`Ocurrió un error: ${error.toString()}`);
                setLoading(false);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function onConfirmAdd() {
        setLoading(true);
        try {
            await putRestLang(restaurant, language);
            goBack();
            snackSuccess("Restaurante creado");
        } catch (error) {
            snackError(`Ocurrió un error: ${error}`);
        }
        setLoading(false);
    }

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
                            Agregar nuevo lenguaje a restaurante
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <InputLabel id="restaurant-selector-label">
                            Restaurante
                        </InputLabel>
                        <Select
                            labelId="restaurant-selector-label"
                            id="restaurant-selector"
                            value={restaurant}
                            label="Restaurante"
                            onChange={(e) => setRestaurant(e.target.value)}
                        >
                            {allRestaurants.map((rest) => (
                                <MenuItem key={rest.id} value={rest.id}>
                                    {rest.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>

                    <Grid item xs={12}>
                        <InputLabel id="language-selector-label">
                            Lenguaje
                        </InputLabel>
                        <Select
                            labelId="language-selector-label"
                            id="language-selector"
                            value={language}
                            label="Lenguaje"
                            onChange={(e) => setLanguage(e.target.value)}
                        >
                            {allLanguages.map((rest) => (
                                <MenuItem key={rest.id} value={rest.id}>
                                    {rest.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>

                    <Grid item xs={12}>
                        <Box display="flex">
                            <Box flexGrow={1} />
                            <Button
                                disabled={restaurant === "" || language === ""}
                                onClick={onConfirmAdd}
                                autoFocus
                                sx={{ alignSelf: "end" }}
                            >
                                Confirmar
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}
