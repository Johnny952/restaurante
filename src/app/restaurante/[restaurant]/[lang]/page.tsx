import Background from "../components/background/background";
import RestaurantHeader from "../components/header/header";
import { Container, Grid } from "@mui/material";
import Category from "./components/category/category";
import MenuButton from "./components/menu-button";
import { getALlParentsByLink } from "@/app/api/categories/get";
import { notFound } from "next/navigation";
import { LanguagePageProps } from "./page.d";
import { getBackground } from "@/app/api/restaurants/get";

export default async function LanguagePage({
    params: { restaurant, lang },
}: LanguagePageProps) {
    const responses = await Promise.all([
        getALlParentsByLink(restaurant, lang),
        getBackground(restaurant),
    ]);
    const allParents = responses[0];
    if (allParents.length === 0 || responses[1].length === 0) {
        notFound();
    }
    const mainBg = responses[1][0].background;

    return (
        <Background image={mainBg}>
            <RestaurantHeader title="BIENVENIDO/A" restaurant={restaurant} />
            <Container sx={{ paddingY: "60px" }}>
                <Grid container spacing={1} rowSpacing={1}>
                    {allParents.map((category, idx) => (
                        <Grid item xs={6} sm={4} md={2} key={idx}>
                            <Category
                                {...category}
                                restaurante={restaurant}
                                language={lang}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Container>
            <MenuButton />
        </Background>
    );
}
