import Background from "../components/background";
import baseBackgroundImage from "@/../public/main-bg.png"
import RestaurantHeader from "../components/header";
import { Container, Grid } from "@mui/material";
import Category from "./components/category";
import MenuButton from "./components/menu-button";
import { getCategories } from "@/app/api/get-categories";
import { notFound } from "next/navigation";

export default async function LanguagePage({ params: { restaurante, lang } }: { params: { restaurante: string, lang: string } }) {
    const allCategories = (await getCategories(restaurante, lang, 'root')).rows
    if (allCategories.length === 0) {
        notFound();
    }

    return (
        <Background image={baseBackgroundImage.src}>
            <RestaurantHeader title="BIENVENIDO/A" />
            <Container sx={{ paddingY: '60px' }}>
                <Grid container spacing={1} rowSpacing={1}>
                    {
                        allCategories.map((category, idx) => (
                            <Grid item xs={6} sm={4} md={2} key={idx}>
                                <Category {...category} restaurante={restaurante} language={lang} />
                            </Grid>
                        ))
                    }
                </Grid>
            </Container>
            <MenuButton />
        </Background>
    )
}