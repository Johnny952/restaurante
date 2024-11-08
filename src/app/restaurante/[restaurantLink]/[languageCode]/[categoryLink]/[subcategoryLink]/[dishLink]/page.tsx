import toTitle from "@/helpers/to-title";
import Background from "@/app/restaurante/components/background";
import RestaurantHeader from "@/app/restaurante/components/header/header";
import { Container, Grid, Typography } from "@mui/material";
import formatPrice from "@/helpers/format-price";
import defaultDishImg from "@/../public/default-dish.png";
import { ImageAsync } from "@/components/image-async";
import NotFound from "@/app/restaurante/components/errors/not-found";
import QuantityButtons from "../../../../../components/quantity-buttons";
import MainWrapper from "../../../../../components/animation/main-wrapper";
import ImageWrapper from "../../../../../components/animation/image-wrapper";
import PriceWrapper from "../../../../../components/animation/price-wrapper";
import ResponsiveNavigation from "@/app/restaurante/components/response-navigation";
import { getByLink as getDishByLink } from "@/lib/services/dishes";
import { getByLink as getRestaurantByLink } from "@/lib/services/restaurant";
import { getByLink as getCategoryByLink } from "@/lib/services/category";

interface Props {
    params: {
        restaurantLink: string;
        languageCode: string;
        categoryLink: string;
        subcategoryLink: string;
        dishLink: string;
    };
}

export default async function DishPage({
    params: {
        dishLink,
        restaurantLink,
        languageCode,
        categoryLink,
        subcategoryLink,
    },
}: Props) {
    const [dish, restaurant, category] = await Promise.all([
        getDishByLink(restaurantLink, languageCode, subcategoryLink, dishLink),
        getRestaurantByLink(restaurantLink),
        getCategoryByLink(restaurantLink, languageCode, subcategoryLink),
    ]);

    if ("error" in restaurant || "error" in category) {
        return null;
    }

    if ("error" in dish) {
        return (
            <NotFound
                image={restaurant.logo}
                backLink={`/restaurante/${restaurant.link}/${languageCode}`}
                title="Plato no encontrado"
                description="Lo sentimos, este plato no existe."
            />
        );
    }

    const dishImage = dish.dish_image || defaultDishImg.src;

    return (
        <Background image={dishImage}>
            <RestaurantHeader
                title={toTitle(dish.dish_name || "")}
                image={restaurant.logo}
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
                                src={dishImage}
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
                                    {dish.dish_description || ""}
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
                                        {formatPrice(dish.dish_price || -1)}
                                    </Typography>
                                </PriceWrapper>
                            </Grid>
                            <Grid item xs={12}>
                                <QuantityButtons
                                    dish={dish}
                                    restaurantId={restaurant.id}
                                    languangeId={languageCode}
                                    categoryId={category.id}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
            <ResponsiveNavigation />
        </Background>
    );
}
