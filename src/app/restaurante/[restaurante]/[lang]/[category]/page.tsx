import { Container, Grid } from "@mui/material";
import Background from "../../components/background";
import RestaurantHeader from "../../components/header";
import { mainCategories } from "../page";
import toTitle from "@/helpers/to-title";
import { DishInterface } from "./components/dish.d";
import Dish from "./components/dish";
import MenuButton from "../components/menu-button";
import BackButton from "../components/back-button";

export const dishes: DishInterface[] = [
    {
        name: 'FETUCCINI A LA HUANCAÍNA CON LOMO SALTADO',
        description: 'Fetuccini al dente con lomo salteado.',
        price: 14900,
        image: '/dishes/fetuccini.png'
    },
    {
        name: 'RAVIOLIS A LA OCOPA CON FILETE AL GRILL',
        description: 'Raviolis en salsa de ocopa flameados con pisco y acompañado con filete al grill.',
        price: 14900,
        image: '/dishes/raviolis.png'
    },
    {
        name: 'ÑOQUIS A LA HUANCAÍNA CON CAMARONES',
        description: 'Tradicional salsa a la huancaína con camarones.',
        price: 13900,
        image: '/dishes/noquis.png'
    },
]

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