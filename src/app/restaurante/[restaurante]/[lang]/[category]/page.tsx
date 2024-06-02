import { Container, Grid } from "@mui/material";
import Background from "../../../../components/background";
import RestaurantHeader from "../../../../components/header";
import toTitle from "@/helpers/to-title";
import Dish from "../../../../components/dish";
import MenuButton from "../../../../components/menu-button";
import BackButton from "@/app/components/back-button";
import { getDishes } from "@/app/api/get-dishes";
import { notFound } from "next/navigation";
import { getCategory } from "@/app/api/get-categories";
import { CategoryPageProps } from "./page.d";

export default async function CategoryPage({ params: { category, restaurante, lang } }: CategoryPageProps) {
    const responses = await Promise.all([
        getDishes(restaurante, lang, category),
        getCategory(restaurante, lang, category),
    ])
    const dishes = responses[0].rows;
    const categoryInfo = responses[0].rows;
    if (categoryInfo.length === 0) {
        notFound()
    }
    if (dishes.length === 0) {
        notFound()
    }
    return (
        <Background image={categoryInfo[0].image || ""}>
            <RestaurantHeader title={toTitle(category)} restaurante={restaurante} />
            <Container sx={{ paddingY: '60px' }}>
                <Grid container spacing={2} rowSpacing={2}>
                    {
                        dishes.map((dish, idx) => (
                            <Grid item xs={12} sm={6} md={4} key={idx}>
                                <Dish {...dish} />
                            </Grid>
                        ))
                    }
                </Grid>
            </Container>
            <MenuButton />
            <BackButton />
        </Background>
    )
}