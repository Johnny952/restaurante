"use client"
import { Box, IconButton, Typography } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import useFavStore from "@/store/fav-store";
import { useCallback } from "react";
import { DishInterface } from "@/app/api/dishes/index.types";

export default function QuantityButtons({
    dish,
    restaurant,
    lang,
    category,
}: {
    dish: DishInterface | null;
    restaurant: string;
    lang: string;
    category: string;
}) {
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

    return (
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
    )
}