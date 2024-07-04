"use client";
import toTitle from "@/helpers/to-title";
import Background from "../../../components/background/background";
import RestaurantHeader from "../../../components/header/header";
import { Box, Container, Grid, IconButton, Typography } from "@mui/material";
import formatPrice from "@/helpers/format-price";
import MenuButton from "../../components/menu-button";
import BackButton from "../components/back-button";
import { getByLink } from "@/app/api/dishes/get";
import defaultDishImg from "@/../public/default-dish.png";
import { DishPageProps } from "./page.d";
import { ImageAsync } from "@/components/image-async";
import { useCallback, useEffect, useState } from "react";
import useFavStore from "@/store/fav-store";
import { DishInterface } from "@/app/api/dishes/index.types";
import useSnackStore from "@/store/snackbar-store";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import ContentLoader from "react-content-loader";
import NotFound from "./components/not-found-dish";

export default function DishPage({
    params: { dish: dishLink, restaurant, lang, category },
}: DishPageProps) {
    const [loading, setLoading] = useState(true);
    const [dish, setDish] = useState<DishInterface | null>(null);
    const [notFound, setNotFound] = useState(false);

    const snackError = useSnackStore((state) => state.setOpenError);

    useEffect(() => {
        const fetchData = async () => {
            return getByLink(restaurant, lang, category, dishLink);
        };

        fetchData()
            .then((data) => {
                setLoading(false);
                if (data.rows.length === 0) {
                    setNotFound(true);
                }
                setDish(data.rows[0]);
            })
            .catch((error) => {
                snackError(`Ocurrió un error: ${error.toString()}`);
            });
    }, [dishLink, restaurant, lang, category, snackError]);

    const addProduct = useFavStore((state) => state.addProduct);
    const subProduct = useFavStore((state) => state.subProduct);

    const quantity = useFavStore(
        useCallback(
            (state) => {
                return dish ? state.products[dish.id]?.quantity || 0 : 0;
            },
            [dish]
        )
    );

    const addToFav = useCallback(() => {
        if (dish) {
            addProduct({ ...dish, restaurant, language: lang, category });
        }
    }, [dish, addProduct, restaurant, lang, category]);

    const removeFromFav = useCallback(() => {
        if (dish) {
            subProduct(dish.id);
        }
    }, [dish, subProduct]);

    const image = !dish || !dish.image ? defaultDishImg.src : dish?.image;

    if (notFound) {
        return (
            <NotFound
                restaurant={restaurant}
                backLink={`/restaurante/${restaurant}/${lang}`}
            />
        );
    }
    return (
        <Background image={image}>
            <RestaurantHeader
                title={toTitle(dish?.name || "")}
                restaurant={restaurant}
                loading={loading}
            />
            <Container sx={{ paddingY: "60px" }}>
                <Grid container spacing={2} rowSpacing={2}>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        display="flex"
                        justifyContent="center"
                    >
                        <div
                            style={{
                                borderRadius: "5%",
                                border: "3px solid #9c27b0",
                                display: "inline-block",
                            }}
                        >
                            <ImageAsync
                                alt="plato"
                                loadingImg={loading}
                                src={image}
                                sizes="100vw"
                                width="100"
                                height="100"
                                style={{
                                    width: "100%",
                                    height: "auto",
                                    borderRadius: "5%",
                                    maxWidth: "300px",
                                }}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Grid container rowSpacing={2}>
                            <Grid item xs={12} textAlign="center">
                                {loading ? (
                                    <ContentLoader
                                        speed={2}
                                        width={300}
                                        height={72}
                                        viewBox="0 0 300 72"
                                        backgroundColor="#000000"
                                        foregroundColor="#ecebeb"
                                    >
                                        <rect
                                            x="0"
                                            y="2"
                                            rx="8"
                                            ry="8"
                                            width="300"
                                            height="20"
                                        />
                                        <rect
                                            x="0"
                                            y="26"
                                            rx="8"
                                            ry="8"
                                            width="300"
                                            height="20"
                                        />
                                        <rect
                                            x="0"
                                            y="50"
                                            rx="8"
                                            ry="8"
                                            width="300"
                                            height="20"
                                        />
                                    </ContentLoader>
                                ) : (
                                    <Typography variant="body1">
                                        {dish?.description || ""}
                                    </Typography>
                                )}
                            </Grid>
                            <Grid item xs={12} textAlign="center">
                                {loading ? (
                                    <ContentLoader
                                        speed={2}
                                        width={200}
                                        height={42}
                                        viewBox="0 0 200 42"
                                        backgroundColor="#000000"
                                        foregroundColor="#ecebeb"
                                    >
                                        <rect
                                            x="0"
                                            y="0"
                                            rx="8"
                                            ry="8"
                                            width="200"
                                            height="42"
                                        />
                                    </ContentLoader>
                                ) : (
                                    <Typography variant="h4">
                                        {formatPrice(dish?.price || -1)}
                                    </Typography>
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        backgroundColor:
                                            "rgba(255, 255, 255, 0.1)",
                                        borderRadius: "24px",
                                        maxWidth: "140px",
                                        margin: "0 auto",
                                    }}
                                >
                                    {quantity > 0 ? (
                                        <>
                                            <IconButton
                                                size="small"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    removeFromFav();
                                                }}
                                                sx={{
                                                    color: "primary.main",
                                                    "&:hover": {
                                                        backgroundColor:
                                                            "rgba(156, 39, 176, 0.04)",
                                                    },
                                                }}
                                            >
                                                <RemoveIcon fontSize="small" />
                                            </IconButton>
                                            <Typography
                                                sx={{
                                                    color: "primary.main",
                                                    mx: 2,
                                                    minWidth: "30px",
                                                    textAlign: "center",
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                {quantity}
                                            </Typography>
                                            <IconButton
                                                size="small"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    addToFav();
                                                }}
                                                sx={{
                                                    color: "primary.main",
                                                    "&:hover": {
                                                        backgroundColor:
                                                            "rgba(156, 39, 176, 0.04)",
                                                    },
                                                }}
                                            >
                                                <AddIcon fontSize="small" />
                                            </IconButton>
                                        </>
                                    ) : (
                                        <IconButton
                                            color="primary"
                                            aria-label="add to cart"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                addToFav();
                                            }}
                                            sx={{
                                                color: "primary.main",
                                                "&:hover": {
                                                    backgroundColor:
                                                        "rgba(156, 39, 176, 0.04)",
                                                },
                                            }}
                                        >
                                            <AddShoppingCartIcon fontSize="small" />
                                        </IconButton>
                                    )}
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
            <MenuButton />
            <BackButton />
        </Background>
    );
}
