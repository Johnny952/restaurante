import toTitle from "@/helpers/to-title";
import Background from "../../../../../components/background";
import RestaurantHeader from "../../../../../components/header/header";
import { Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import formatPrice from "@/helpers/format-price";
import MenuButton from "../../../../../components/menu-button";
import BackButton from "@/app/components/back-button";
import { getDish } from "@/app/api/get-dishes";
import { notFound } from "next/navigation";
import defaultDishImg from '@/../public/default-dish.png';
import { DishPageProps } from "./page.d";
import { ImageAsync } from "@/app/components/image-async";

export default async function DishPage({ params: { dish, restaurante, lang, category } }: DishPageProps) {
    const dishInfo = (await getDish(restaurante, lang, category, dish)).rows
    if (dishInfo.length === 0) {
        notFound()
    }
    const image = !dishInfo[0].image || dishInfo[0].image === "" ? defaultDishImg : dishInfo[0].image;
    return (
        <Background image={dishInfo[0].image || ""}>
            <RestaurantHeader title={toTitle(dishInfo[0].name)} restaurante={restaurante} />
            <Container sx={{ paddingY: '60px' }}>
                <Grid container spacing={2} rowSpacing={2}>
                    <Grid item xs={12} sm={6} display='flex' justifyContent='center'>
                        <div style={{ borderRadius: '5%', border: '3px solid #9c27b0', display: 'inline-block' }}>
                            <ImageAsync
                                alt="plato"
                                src={image}
                                sizes="100vw"
                                width='100'
                                height='100'
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    borderRadius: '5%',
                                    maxWidth: '300px'
                                }}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Grid container rowSpacing={2}>
                            <Grid item xs={12} textAlign='center'>
                                <Typography variant="body1">{dishInfo[0].description}</Typography>
                            </Grid>
                            <Grid item xs={12} textAlign='center'>
                                <Typography variant="h4">{formatPrice(dishInfo[0].price)}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>
            </Container>
            <MenuButton />
            <BackButton />
        </Background >
    )
}