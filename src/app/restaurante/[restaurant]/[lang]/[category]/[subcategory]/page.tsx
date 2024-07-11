import { Container, Grid } from "@mui/material";
import toTitle from "@/helpers/to-title";
import { getByCategory } from "@/app/api/dishes/get";
import { getByLink } from "@/app/api/categories/get";
import { SubcategoryPageProps } from "./page.d";
import Background from "../../../components/background/background";
import RestaurantHeader from "../../../components/header/header";
import NotFound from "../components/not-found-category";
import { getBackground } from "@/app/api/restaurants/get";
import ResponsiveNavigation from "../../../components/response-navigation";
import Dish from "../components/dish";

export default async function SubcategoryPage({
    params: { category, subcategory, restaurant, lang },
}: SubcategoryPageProps) {
    const [ds, cat, restaurantImages] = await Promise.all([
        getByCategory(restaurant, lang, subcategory),
        getByLink(restaurant, lang, subcategory),
        getBackground(restaurant),
    ]);
    const logo = restaurantImages[0].image;
    if (cat.rows.length === 0) {
        return (
            <NotFound
                image={logo}
                backLink={`/restaurante/${restaurant}/${lang}`}
                title="Categoría no encontrada"
                description={"Lo sentimos, esta categoría aún no existe."}
            />
        );
    }
    const categoryInfo = cat.rows[0];
    if (ds.rows.length === 0) {
        return (
            <NotFound
                image={logo}
                backLink={`/restaurante/${restaurant}/${lang}`}
                bgImage={categoryInfo?.image}
                title="Categoría sin platos"
                description={
                    "Lo sentimos, los platos asociados a esta categoría no están disponible o no existen aún."
                }
            />
        );
    }
    const dishes = ds.rows;

    return (
        <Background image={categoryInfo?.image || ""}>
            <RestaurantHeader title={toTitle(categoryInfo.name)} image={logo} />
            <Container sx={{ paddingY: "60px" }}>
                <Grid container spacing={2} rowSpacing={2}>
                    {dishes?.map((dish, idx) => (
                        <Grid item xs={12} sm={6} md={4} key={idx}>
                            <Dish
                                {...dish}
                                category={subcategory}
                                restaurant={restaurant}
                                lang={lang}
                                link={`${subcategory}/${dish.link}`}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Container>
            <ResponsiveNavigation />
        </Background>
    );
}
