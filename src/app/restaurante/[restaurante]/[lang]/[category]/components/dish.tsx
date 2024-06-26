"use client";
import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    Typography,
} from "@mui/material";
import toTitle from "@/helpers/to-title";
import formatPrice from "@/helpers/format-price";
import { usePathname, useRouter } from "next/navigation";
import { DishInterface } from "@/app/api/dishes/index.types";
import defaultDishImg from "@/../public/default-dish.png";
import { ImageAsync } from "@/components/image-async";

export default function Dish({
    image,
    name,
    description,
    price,
    link,
}: DishInterface) {
    const router = useRouter();
    const pathname = usePathname();
    const img = !image || image === "" ? defaultDishImg.src : image;
    return (
        <Card
            sx={{
                backgroundColor: "rgba(0, 0, 0, 0)",
                border: "solid",
                borderColor: "rgba(255, 255, 255, 0.7)",
                borderWidth: "1px",
                px: "10px",
                height: "100%",
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
                <Box sx={{ display: "flex", flexDirection: "column" }}>
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
        </Card>
    );
}
