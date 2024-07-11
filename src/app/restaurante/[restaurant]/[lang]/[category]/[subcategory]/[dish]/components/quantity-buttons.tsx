"use client";
import { Box, IconButton, Typography } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import useFavStore from "@/store/fav-store";
import { useCallback } from "react";
import { DishInterface } from "@/app/api/dishes/index.types";
import { motion } from "framer-motion";
import { purple } from "@mui/material/colors";

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
    const AnimatedIconButton = motion(IconButton);
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
                backgroundColor: "rgba(156, 39, 176, 0.4)",
                borderRadius: "24px",
                maxWidth: "160px",
                margin: "0 auto",
                padding: "4px",
                boxShadow: "0 2px 10px rgba(156, 39, 176, 0.2)",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                    backgroundColor: "rgba(156, 39, 176, 0.2)",
                    boxShadow: "0 4px 20px rgba(156, 39, 176, 0.3)",
                },
            }}
        >
            {quantity > 0 ? (
                <>
                    <AnimatedIconButton
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        size="small"
                        onClick={(e) => {
                            e.stopPropagation();
                            removeFromFav();
                        }}
                        sx={{
                            color: purple[200],
                            "&:hover": {
                                backgroundColor: "rgba(156, 39, 176, 0.04)",
                            },
                        }}
                    >
                        <RemoveIcon fontSize="small" />
                    </AnimatedIconButton>
                    <motion.div
                        key={quantity}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Typography
                            sx={{
                                color: purple[200],
                                mx: 2,
                                minWidth: "30px",
                                textAlign: "center",
                                fontWeight: "bold",
                            }}
                        >
                            {quantity}
                        </Typography>
                    </motion.div>
                    <AnimatedIconButton
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        size="small"
                        onClick={(e) => {
                            e.stopPropagation();
                            addToFav();
                        }}
                        sx={{
                            color: purple[200],
                            "&:hover": {
                                backgroundColor: "rgba(156, 39, 176, 0.04)",
                            },
                        }}
                    >
                        <AddIcon fontSize="small" />
                    </AnimatedIconButton>
                </>
            ) : (
                <AnimatedIconButton
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    color="primary"
                    aria-label="add to cart"
                    onClick={(e) => {
                        e.stopPropagation();
                        addToFav();
                    }}
                    sx={{
                        color: "primary.main",
                        "&:hover": {
                            backgroundColor: "rgba(156, 39, 176, 0.04)",
                        },
                    }}
                >
                    <AddShoppingCartIcon fontSize="small" />
                </AnimatedIconButton>
            )}
        </Box>
    );
}
