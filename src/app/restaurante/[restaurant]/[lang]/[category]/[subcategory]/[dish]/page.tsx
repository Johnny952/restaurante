import toTitle from "@/helpers/to-title";
import Background from "@/app/restaurante/[restaurant]/components/background/background";
import RestaurantHeader from "@/app/restaurante/[restaurant]/components/header/header";
import { Container, Grid, Typography } from "@mui/material";
import formatPrice from "@/helpers/format-price";
import { getByLink } from "@/app/api/dishes/get";
import defaultDishImg from "@/../public/default-dish.png";
import { DishPageProps } from "./page.d";
import { ImageAsync } from "@/components/image-async";
import NotFound from "./components/not-found-dish";
import QuantityButtons from "./components/quantity-buttons";
import { getBackground } from "@/app/api/restaurants/get";
import MainWrapper from "./components/animations/main-wrapper";
import ImageWrapper from "./components/animations/image-wrapper";
import PriceWrapper from "./components/animations/price-wrapper";
import ResponsiveNavigation from "@/app/restaurante/[restaurant]/components/response-navigation";

export default async function DishPage({
    params: { dish: dishLink, restaurant, lang, category, subcategory },
}: DishPageProps) {
    const responses = await Promise.all([
        getByLink(restaurant, lang, subcategory, dishLink),
        getBackground(restaurant),
    ]);
    const logo = responses[1][0].image;
    if (responses[0].rows.length === 0) {
        return (
            <NotFound
                image={logo}
                backLink={`/restaurante/${restaurant}/${lang}`}
            />
        );
    }
    const dish = responses[0].rows[0];

    const image = !dish || !dish.image ? defaultDishImg.src : dish?.image;

    return (
        <MainWrapper>
            <Background image={image}>
                <RestaurantHeader
                    title={toTitle(dish?.name || "")}
                    image={logo}
                />
                <Container sx={{ paddingY: "60px" }}>
                    <Grid container spacing={2} rowSpacing={2}>
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            display="flex"
                            justifyContent="center"
                        >
                            <ImageWrapper>
                                <ImageAsync
                                    alt="plato"
                                    src={image}
                                    sizes="100vw"
                                    width="100"
                                    height="100"
                                    style={{
                                        width: "100%",
                                        height: "auto",
                                        borderRadius: "5%",
                                        maxWidth: "300px",
                                    }}
                                />
                            </ImageWrapper>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Grid container rowSpacing={2}>
                                <Grid item xs={12} textAlign="center">
                                    <Typography variant="body1">
                                        {dish?.description || ""}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} textAlign="center">
                                    <PriceWrapper>
                                        <Typography
                                            variant="h4"
                                            sx={{
                                                background:
                                                    "linear-gradient(45deg, #9c27b0, #673ab7)",
                                                WebkitBackgroundClip: "text",
                                                WebkitTextFillColor:
                                                    "transparent",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {formatPrice(dish?.price || -1)}
                                        </Typography>
                                    </PriceWrapper>
                                </Grid>
                                <Grid item xs={12}>
                                    <QuantityButtons
                                        dish={dish}
                                        restaurant={restaurant}
                                        lang={lang}
                                        category={subcategory}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
                <ResponsiveNavigation />
            </Background>
        </MainWrapper>
    );
}
