import { Container, Grid } from "@mui/material";
import toTitle from "@/helpers/to-title";
import Dish from "../../../components/dish";
import RestaurantHeader from "../../../components/header/header";
import NotFound from "@/app/restaurante/components/errors/not-found";
import ResponsiveNavigation from "../../../components/response-navigation";
import ContainerWrapper from "../../../components/animation/container-wrapper";
import CategoryWrapper from "../../../components/animation/category-wrapper";
import Category from "../../../components/category/category";
import { getAllByCategoryLink } from "@/lib/services/dishes";
import {
    getAllChildrenByParentLink,
    getByLink as getCategoryByLink,
} from "@/lib/services/category";
import { getByLink as getRestaurantByLink } from "@/lib/services/restaurant";
import Background from "@/app/restaurante/components/background";

interface Props {
    params: {
        restaurantLink: string;
        languageCode: string;
        categoryLink: string;
    };
}

export default async function CategoryPage({
    params: { categoryLink, restaurantLink, languageCode },
}: Props) {
    const [dishes, category, restaurant, subcategories] = await Promise.all([
        getAllByCategoryLink(restaurantLink, languageCode, categoryLink),
        getCategoryByLink(restaurantLink, languageCode, categoryLink),
        getRestaurantByLink(restaurantLink),
        getAllChildrenByParentLink(restaurantLink, languageCode, categoryLink),
    ]);
    if ("error" in restaurant) {
        return null;
    }
    if ("error" in category) {
        return (
            <NotFound
                image={restaurant.logo}
                bgImage={restaurant.background_image}
                backLink={`/restaurante/${restaurant.link}/${languageCode}`}
                title="Categoría no encontrada"
                description={"Lo sentimos, esta categoría aún no existe."}
            />
        );
    }
    if ("error" in dishes && "error" in subcategories) {
        return (
            <NotFound
                image={restaurant.logo}
                backLink={`/restaurante/${restaurantLink}/${languageCode}`}
                bgImage={restaurant.background_image}
                title="Categoría sin platos ni subcategorías"
                description={
                    "Lo sentimos, los platos asociados a esta categoría no están disponible o no existen aún."
                }
            />
        );
    }

    return (
        <Background image={category.category_image}>
            <RestaurantHeader
                title={toTitle(category.category_name)}
                image={restaurant.logo}
            />
            <Container sx={{ paddingY: "60px" }}>
                <ContainerWrapper>
                    <Grid container spacing={2} rowSpacing={2}>
                        {!("error" in subcategories)
                            ? subcategories.map((subcat, idx) => (
                                <Grid item xs={6} sm={4} md={2} key={idx}>
                                    <CategoryWrapper>
                                        <Category
                                            {...subcat}
                                            category_link={`${category.category_link}/${subcat.category_link}`}
                                        />
                                    </CategoryWrapper>
                                </Grid>
                            ))
                            : !("error" in dishes)
                                ? dishes.map((dish, idx) => (
                                    <Grid item xs={12} sm={6} md={4} key={idx}>
                                        <Dish
                                            {...dish}
                                            dish_link={`${category.category_link}/${dish.dish_link}`}
                                        />
                                    </Grid>
                                ))
                                : null}
                    </Grid>
                </ContainerWrapper>
            </Container>
            <ResponsiveNavigation />
        </Background>
    );
}
