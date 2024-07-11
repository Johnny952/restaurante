import { Container, Grid } from "@mui/material";
import toTitle from "@/helpers/to-title";
import Dish from "./components/dish";
import { getByCategory } from "@/app/api/dishes/get";
import { getALlChildrenByLink, getByLink } from "@/app/api/categories/get";
import { CategoryPageProps } from "./page.d";
import Background from "../../components/background/background";
import RestaurantHeader from "../../components/header/header";
import NotFound from "./components/not-found-category";
import { getBackground } from "@/app/api/restaurants/get";
import ResponsiveNavigation from "../../components/response-navigation";
import ContainerWrapper from "../components/animations/container-wrapper";
import CategoryWrapper from "../components/animations/category-wrapper";
import Category from "../components/category/category";

export default async function CategoryPage({
    params: { category, restaurant, lang },
}: CategoryPageProps) {
    const [ds, cat, restaurantImages, subcats] = await Promise.all([
        getByCategory(restaurant, lang, category),
        getByLink(restaurant, lang, category),
        getBackground(restaurant),
        getALlChildrenByLink(restaurant, lang, category),
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
    if (ds.rows.length === 0 && subcats.length === 0) {
        return (
            <NotFound
                image={logo}
                backLink={`/restaurante/${restaurant}/${lang}`}
                bgImage={categoryInfo?.image}
                title="Categoría sin platos ni subcategorías"
                description={
                    "Lo sentimos, los platos asociados a esta categoría no están disponible o no existen aún."
                }
            />
        );
    }
    const dishes = ds.rows;
    const hasSubcategories = subcats.length > 0;

    return (
        <Background image={categoryInfo?.image || ""}>
            <RestaurantHeader title={toTitle(categoryInfo.name)} image={logo} />
            <Container sx={{ paddingY: "60px" }}>
                <ContainerWrapper>
                    <Grid container spacing={2} rowSpacing={2}>
                        {
                            hasSubcategories ?
                                subcats.map((subcat, idx) => (
                                    <Grid item xs={6} sm={4} md={2} key={idx}>
                                        <CategoryWrapper>
                                            <Category
                                                {...subcat}
                                                link={`${category}/${subcat.link}`}
                                            />
                                        </CategoryWrapper>
                                    </Grid>
                                ))
                                : dishes?.map((dish, idx) => (
                                    <Grid item xs={12} sm={6} md={4} key={idx}>
                                        <Dish
                                            {...dish}
                                            category={category}
                                            restaurant={restaurant}
                                            lang={lang}
                                            link={`${category}/${dish.link}`}
                                        />
                                    </Grid>
                                ))
                        }
                    </Grid>
                </ContainerWrapper>
            </Container>
            <ResponsiveNavigation />
        </Background>
    );
}
