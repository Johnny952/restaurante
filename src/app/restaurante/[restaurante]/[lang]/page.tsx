import Background from "../components/background";
import baseBackgroundImage from "@/../public/main-bg.png"
import RestaurantHeader from "../components/header";
import { Container, Grid } from "@mui/material";
import Category from "./components/category";
import MenuButton from "./components/menu-button";
import { mainCategories } from "./constants/main-categories";

export default function LanguagePage({ params }: { params: { language: string } }) {
    return (
        <Background image={baseBackgroundImage.src}>
            <RestaurantHeader title="BIENVENIDO/A" />
            <Container sx={{ paddingY: '60px' }}>
                <Grid container spacing={1} rowSpacing={1}>
                    {
                        mainCategories.map((category, idx) => (
                            <Grid item xs={6} sm={4} md={2} key={idx}>
                                <Category {...category} />
                            </Grid>
                        ))
                    }
                </Grid>
            </Container>

            <MenuButton />
        </Background>
    )
}