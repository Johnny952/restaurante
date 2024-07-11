import Background from "../components/background/background";
import RestaurantHeader from "../components/header/header";
import { Container, Grid } from "@mui/material";
import Category from "./components/category/category";
import { getALlParentsByLink } from "@/app/api/categories/get";
import { notFound } from "next/navigation";
import { LanguagePageProps } from "./page.d";
import { getBackground } from "@/app/api/restaurants/get";
import ContainerWrapper from "./components/animations/container-wrapper";
import CategoryWrapper from "./components/animations/category-wrapper";
import ResponsiveNavigation from "../components/response-navigation";

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
    const logo = responses[1][0].image;

    return (
        <Background image={mainBg}>
            <RestaurantHeader title="Categorías" image={logo} />
            <Container sx={{ paddingY: "60px" }}>
                <ContainerWrapper>
                    <Grid container spacing={1} rowSpacing={1}>
                        {allParents.map((category, idx) => (
                            <Grid item xs={6} sm={4} md={2} key={idx}>
                                <CategoryWrapper>
                                    <Category
                                        {...category}
                                        link={`${lang}/${category.link}`}
                                    />
                                </CategoryWrapper>
                            </Grid>
                        ))}
                    </Grid>
                </ContainerWrapper>
            </Container>
            <ResponsiveNavigation disableBack={true} />
        </Background>
    );
}
