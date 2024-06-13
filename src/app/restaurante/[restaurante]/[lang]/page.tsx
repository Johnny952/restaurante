import Background from "../components/background/background";
import RestaurantHeader from "../components/header/header";
import { Container, Grid } from "@mui/material";
import Category from "./components/category/category";
import MenuButton from "./components/menu-button";
import { getCategories, getRoot } from "@/app/api/get-categories";
import { notFound } from "next/navigation";
import { LanguagePageProps } from "./page.d";

export default async function LanguagePage({
    params: { restaurante, lang },
}: LanguagePageProps) {
    const responses = await Promise.all([
        getCategories(restaurante, lang, "root"),
        getRoot(restaurante),
    ]);
    const allCategories = responses[0].rows;
    const mainBg = responses[1].rows;
    if (allCategories.length === 0 || mainBg.length === 0) {
        notFound();
    }

    return (
        <Background image={mainBg[0].image}>
            <RestaurantHeader title="BIENVENIDO/A" restaurante={restaurante} />
            <Container sx={{ paddingY: "60px" }}>
                <Grid container spacing={1} rowSpacing={1}>
                    {allCategories.map((category, idx) => (
                        <Grid item xs={6} sm={4} md={2} key={idx}>
                            <Category
                                {...category}
                                restaurante={restaurante}
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
