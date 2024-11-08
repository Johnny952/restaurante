import Background from "../../components/background";
import RestaurantHeader from "../../components/header/header";
import { Container, Grid } from "@mui/material";
import Category from "../../components/category/category";
import ContainerWrapper from "../../components/animation/container-wrapper";
import CategoryWrapper from "../../components/animation/category-wrapper";
import ResponsiveNavigation from "../../components/response-navigation";
import { getAllParentsByRestaurantLanguage } from "@/lib/services/category";
import { getByLink } from "@/lib/services/restaurant";

interface Props {
    params: {
        restaurantLink: string;
        languageCode: string;
    };
}

export default async function LanguagePage({
    params: { restaurantLink, languageCode },
}: Props) {
    const [allParents, restaurant] = await Promise.all([
        getAllParentsByRestaurantLanguage(restaurantLink, languageCode),
        getByLink(restaurantLink),
    ]);
    if ("error" in allParents) {
        return null;
    }
    if ("error" in restaurant) {
        return null;
    }

    return (
        <Background image={restaurant.background_image}>
            <RestaurantHeader title="Categorías" image={restaurant.logo} />
            <Container sx={{ paddingY: "60px" }}>
                <ContainerWrapper>
                    <Grid container spacing={1} rowSpacing={1}>
                        {allParents.map((category, idx) => (
                            <Grid item xs={6} sm={4} md={2} key={idx}>
                                <CategoryWrapper>
                                    <Category
                                        {...category}
                                        category_link={`${languageCode}/${category.category_link}`}
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
