import { Container, Grid } from "@mui/material";
import Background from "../../components/background/background";
import RestaurantHeader from "../../components/header/header";
import toTitle from "@/helpers/to-title";
import Dish from "./components/dish";
import MenuButton from "../components/menu-button";
import BackButton from "./components/back-button";
import { getByCategory } from "@/app/api/dishes/get";
import { notFound } from "next/navigation";
import { getByLink } from "@/app/api/categories/get";
import { CategoryPageProps } from "./page.d";

export default async function CategoryPage({
    params: { category, restaurant, lang },
}: CategoryPageProps) {
    const responses = await Promise.all([
        getByCategory(restaurant, lang, category),
        getByLink(restaurant, lang, category),
    ]);
    const dishes = responses[0].rows;
    const categoryInfo = responses[0].rows;
    if (categoryInfo.length === 0 || dishes.length === 0) {
        notFound();
    }
    return (
        <Background image={categoryInfo[0].image || ""}>
            <RestaurantHeader
                title={toTitle(category)}
                restaurant={restaurant}
            />
            <Container sx={{ paddingY: "60px" }}>
                <Grid container spacing={2} rowSpacing={2}>
                    {dishes.map((dish, idx) => (
                        <Grid item xs={12} sm={6} md={4} key={idx}>
                            <Dish {...dish} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
            <MenuButton />
            <BackButton />
        </Background>
    );
}
