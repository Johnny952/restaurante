import { Container, Grid } from "@mui/material";
import toTitle from "@/helpers/to-title";
import Dish from "./components/dish";
import { getByCategory } from "@/app/api/dishes/get";
import { getByLink } from "@/app/api/categories/get";
import { CategoryPageProps } from "./page.d";
import Background from "../../components/background/background";
import RestaurantHeader from "../../components/header/header";
import MenuButton from "../components/menu-button";
import BackButton from "./components/back-button";
import NotFound from "./components/not-found-category";

export default async function CategoryPage({
    params: { category, restaurant, lang },
}: CategoryPageProps) {
    const ds = await getByCategory(restaurant, lang, category);
    const cat = await getByLink(restaurant, lang, category);
    if (cat.rows.length === 0) {
        return (<NotFound
            restaurant={restaurant}
            backLink={`/restaurante/${restaurant}/${lang}`}
            title="Categoría no encontrada"
            description={"Lo sentimos, esta categoría aún no existe."}
        />)
    }
    const categoryInfo = cat.rows[0];
    if (ds.rows.length === 0) {
        return (
            <NotFound
                restaurant={restaurant}
                backLink={`/restaurante/${restaurant}/${lang}`}
                bgImage={categoryInfo?.image}
                title="Categoría sin platos"
                description={"Lo sentimos, los platos asociados a esta categoría no están disponible o no existen aún."}
            />
        );
    }
    const dishes = ds.rows;

    return (
        <Background image={categoryInfo?.image || ""}>
            <RestaurantHeader
                title={toTitle(category)}
                restaurant={restaurant}
            />
            <Container sx={{ paddingY: "60px" }}>
                <Grid container spacing={2} rowSpacing={2}>
                    {dishes?.map((dish, idx) => (
                        <Grid item xs={12} sm={6} md={4} key={idx}>
                            <Dish
                                {...dish}
                                category={category}
                                restaurant={restaurant}
                                lang={lang}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Container>
            <MenuButton />
            <BackButton />
        </Background>
    );
}
