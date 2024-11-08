"use client";
import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    IconButton,
    Typography,
} from "@mui/material";
import { purple } from "@mui/material/colors";
import toTitle from "@/helpers/to-title";
import formatPrice from "@/helpers/format-price";
import { useRouter } from "next/navigation";
import defaultDishImg from "@/../public/default-dish.png";
import { ImageAsync } from "@/components/image-async";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import useFavStore from "@/store/fav-store";
import { useCallback } from "react";
import { DishType } from "@/lib/models/dishes";

export default function Dish(dish: DishType) {
    const router = useRouter();
    const img = !dish.dish_image || dish.dish_image === "" ? defaultDishImg.src : dish.dish_image;

    const addToFav = useCallback(() => {
        useFavStore.getState().addProduct(dish);
    }, [dish]);

    const removeFromFav = useCallback(() => {
        useFavStore.getState().subProduct(dish.id);
    }, [dish]);

    const quantity = useFavStore(
        useCallback((state) => state.products[dish.id]?.quantity || 0, [dish.id])
    );

    return (
        <Card
            sx={{
                backgroundColor: "rgba(0, 0, 0, 0)",
                border: "solid",
                borderColor: purple[200],
                borderWidth: "1px",
                px: "10px",
                height: "100%",
                position: "relative",
            }}
            elevation={0}
        >
            <CardActionArea
                sx={{ display: "flex", height: "100%" }}
                onClick={() => router.push(dish.dish_link || "/")}
            >
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <div
                        style={{
                            borderRadius: "10%",
                            border: `2px solid ${purple[500]}`,
                            width: 93,
                        }}
                    >
                        <ImageAsync
                            alt="plato"
                            src={img}
                            sizes="100vw"
                            width={100}
                            height={100}
                            priority={true}
                            style={{
                                width: "100%",
                                height: "auto",
                                borderRadius: "10%",
                            }}
                        />
                    </div>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        flexGrow: 1,
                    }}
                >
                    <CardContent sx={{ flex: "0 1 auto", color: "white" }}>
                        <Box sx={{ flexDirection: "column" }}>
                            <Box>
                                <Typography
                                    component="div"
                                    sx={{ fontSize: "14px", fontWeight: 500 }}
                                >
                                    {toTitle(dish.dish_name)}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography
                                    variant="subtitle1"
                                    component="div"
                                    sx={{ fontSize: "12px" }}
                                >
                                    {dish.dish_description}
                                </Typography>
                            </Box>
                            <Box alignSelf="flex-end">
                                <Typography component="div" variant="h6">
                                    {formatPrice(dish.dish_price || 0)}
                                </Typography>
                            </Box>
                        </Box>
                    </CardContent>
                </Box>
            </CardActionArea>

            <Box
                sx={{
                    position: "absolute",
                    bottom: 8,
                    right: 8,
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: purple[50],
                    borderRadius: "16px",
                    padding: "2px",
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
                            sx={{ color: purple[700] }}
                        >
                            <RemoveIcon fontSize="small" />
                        </IconButton>
                        <Typography
                            sx={{
                                color: purple[700],
                                mx: 1,
                                minWidth: "20px",
                                textAlign: "center",
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
                            sx={{ color: purple[700] }}
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
                        sx={{ color: purple[700] }}
                    >
                        <AddShoppingCartIcon fontSize="small" />
                    </IconButton>
                )}
            </Box>
        </Card>
    );
}
