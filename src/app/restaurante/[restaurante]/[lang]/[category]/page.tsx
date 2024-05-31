import { Container, Grid } from "@mui/material";
import Background from "../../components/background";
import RestaurantHeader from "../../components/header";
import { mainCategories } from "../constants/main-categories";
import toTitle from "@/helpers/to-title";
import Dish from "./components/dish";
import MenuButton from "../components/menu-button";
import BackButton from "../components/back-button";
import { dishes } from "../constants/dishes";

export default function CategoryPage({ params: { category } }: { params: { category: string } }) {
    return (
        <Background image={mainCategories[0]?.image || ""}>
            <RestaurantHeader title={toTitle(category)} />
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