"use client";
import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    IconButton,
    Typography,
} from "@mui/material";
import toTitle from "@/helpers/to-title";
import formatPrice from "@/helpers/format-price";
import { usePathname, useRouter } from "next/navigation";
import { DishInterface } from "@/app/api/dishes/index.types";
import defaultDishImg from "@/../public/default-dish.png";
import { ImageAsync } from "@/components/image-async";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import useFavStore from "@/store/fav-store";
import { useCallback } from "react";
import { CategoryPageProps } from "../page.d";

export default function Dish({
    id,
    image,
    name,
    description,
    price,
    link,
    category,
    restaurant,
    lang,
}: DishInterface & CategoryPageProps["params"]) {
    const router = useRouter();
    const pathname = usePathname();
    const img = !image || image === "" ? defaultDishImg.src : image;

    const addToFav = useCallback(() => {
        useFavStore.getState().addProduct({
            id,
            name: toTitle(name),
            link,
            price,
            image,
            category,
            restaurant,
            language: lang,
        });
    }, [id, name, link, price, image, category, restaurant, lang]);

    const removeFromFav = useCallback(() => {
        useFavStore.getState().subProduct(id);
    }, [id]);

    const quantity = useFavStore(
        useCallback((state) => state.products[id]?.quantity || 0, [id])
    );

    return (
        <Card
            sx={{
                backgroundColor: "rgba(0, 0, 0, 0)",
                border: "solid",
                borderColor: "rgba(255, 255, 255, 0.7)",
                borderWidth: "1px",
                px: "10px",
                height: "100%",
                position: "relative",
            }}
            elevation={0}
        >
            <CardActionArea
                sx={{ display: "flex", height: "100%" }}
                onClick={() => router.push(`${pathname}/${link}`)}
            >
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <div
                        style={{
                            borderRadius: "10%",
                            border: "2px solid #9c27b0",
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
                                    {toTitle(name)}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography
                                    variant="subtitle1"
                                    component="div"
                                    sx={{ fontSize: "12px" }}
                                >
                                    {description}
                                </Typography>
                            </Box>
                            <Box alignSelf="flex-end">
                                <Typography component="div" variant="h6">
                                    {formatPrice(price)}
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
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
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
                            sx={{ color: "primary.main" }}
                        >
                            <RemoveIcon fontSize="small" />
                        </IconButton>
                        <Typography
                            sx={{
                                color: "primary.main",
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
                            sx={{ color: "primary.main" }}
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
                        sx={{ color: "primary.main" }}
                    >
                        <AddShoppingCartIcon fontSize="small" />
                    </IconButton>
                )}
            </Box>
        </Card>
    );
}
