import { Container, Grid } from "@mui/material";
import toTitle from "@/helpers/to-title";
import Background from "@/app/restaurante/components/background";
import RestaurantHeader from "@/app/restaurante/components/header/header";
import ResponsiveNavigation from "../../../../components/response-navigation";
import Dish from "@/app/restaurante/components/dish";
import { getAllByCategoryLink } from "@/lib/services/dishes";
import { getByLink as getCategoryByLink } from "@/lib/services/category";
import { getByLink as getRestaurantByLink } from "@/lib/services/restaurant";
import NotFound from "@/app/restaurante/components/errors/not-found";

interface Props {
    params: {
        restaurantLink: string;
        languageCode: string;
        categoryLink: string;
        subcategoryLink: string;
    };
}

export default async function SubcategoryPage({
    params: { restaurantLink, languageCode, subcategoryLink },
}: Props) {
    const [dishes, category, restaurant] = await Promise.all([
        getAllByCategoryLink(restaurantLink, languageCode, subcategoryLink),
        getCategoryByLink(restaurantLink, languageCode, subcategoryLink),
        getRestaurantByLink(restaurantLink),
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
    if ("error" in dishes) {
        return (
            <NotFound
                image={restaurant.logo}
                backLink={`/restaurante/${restaurantLink}/${languageCode}`}
                bgImage={restaurant.background_image}
                title="Categoría sin platos"
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
                <Grid container spacing={2} rowSpacing={2}>
                    {dishes?.map((dish, idx) => (
                        <Grid item xs={12} sm={6} md={4} key={idx}>
                            <Dish
                                {...dish}
                                dish_link={`${category.category_link}/${dish.dish_link}`}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Container>
            <ResponsiveNavigation />
        </Background>
    );
}
