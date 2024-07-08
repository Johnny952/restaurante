import toTitle from "@/helpers/to-title";
import Background from "../../../components/background/background";
import RestaurantHeader from "../../../components/header/header";
import { Container, Grid, Typography } from "@mui/material";
import formatPrice from "@/helpers/format-price";
import MenuButton from "../../components/menu-button";
import BackButton from "../components/back-button";
import { getByLink } from "@/app/api/dishes/get";
import defaultDishImg from "@/../public/default-dish.png";
import { DishPageProps } from "./page.d";
import { ImageAsync } from "@/components/image-async";
import ContentLoader from "react-content-loader";
import NotFound from "./components/not-found-dish";
import QuantityButtons from "./components/quantity-buttons";
import { getBackground } from "@/app/api/restaurants/get";

export default async function DishPage({
    params: { dish: dishLink, restaurant, lang, category },
}: DishPageProps) {
    const loading = false;
    const responses = await Promise.all([
        getByLink(restaurant, lang, category, dishLink),
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
        <Background image={image}>
            <RestaurantHeader
                title={toTitle(dish?.name || "")}
                image={logo}
                loading={loading}
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
                        <div
                            style={{
                                borderRadius: "5%",
                                border: "3px solid #9c27b0",
                                display: "inline-block",
                            }}
                        >
                            <ImageAsync
                                alt="plato"
                                loadingImg={loading}
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
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Grid container rowSpacing={2}>
                            <Grid item xs={12} textAlign="center">
                                {loading ? (
                                    <ContentLoader
                                        speed={2}
                                        width={300}
                                        height={72}
                                        viewBox="0 0 300 72"
                                        backgroundColor="#000000"
                                        foregroundColor="#ecebeb"
                                    >
                                        <rect
                                            x="0"
                                            y="2"
                                            rx="8"
                                            ry="8"
                                            width="300"
                                            height="20"
                                        />
                                        <rect
                                            x="0"
                                            y="26"
                                            rx="8"
                                            ry="8"
                                            width="300"
                                            height="20"
                                        />
                                        <rect
                                            x="0"
                                            y="50"
                                            rx="8"
                                            ry="8"
                                            width="300"
                                            height="20"
                                        />
                                    </ContentLoader>
                                ) : (
                                    <Typography variant="body1">
                                        {dish?.description || ""}
                                    </Typography>
                                )}
                            </Grid>
                            <Grid item xs={12} textAlign="center">
                                {loading ? (
                                    <ContentLoader
                                        speed={2}
                                        width={200}
                                        height={42}
                                        viewBox="0 0 200 42"
                                        backgroundColor="#000000"
                                        foregroundColor="#ecebeb"
                                    >
                                        <rect
                                            x="0"
                                            y="0"
                                            rx="8"
                                            ry="8"
                                            width="200"
                                            height="42"
                                        />
                                    </ContentLoader>
                                ) : (
                                    <Typography variant="h4">
                                        {formatPrice(dish?.price || -1)}
                                    </Typography>
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                <QuantityButtons
                                    dish={dish}
                                    restaurant={restaurant}
                                    lang={lang}
                                    category={category}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
            <MenuButton />
            <BackButton />
        </Background>
    );
}
