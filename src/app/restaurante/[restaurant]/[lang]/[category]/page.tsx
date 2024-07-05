"use client";
import { Container, Grid } from "@mui/material";
import toTitle from "@/helpers/to-title";
import Dish from "./components/dish";
import { getByCategory } from "@/app/api/dishes/get";
import { getByLink } from "@/app/api/categories/get";
import { CategoryPageProps } from "./page.d";
import { useEffect, useState } from "react";
import { DishInterface } from "@/app/api/dishes/index.types";
import { CategoryAPI } from "@/app/api/categories/index.types";
import Background from "../../components/background/background";
import RestaurantHeader from "../../components/header/header";
import MenuButton from "../components/menu-button";
import BackButton from "./components/back-button";
import NotFound from "./components/not-found-category";

export default function CategoryPage({
    params: { category, restaurant, lang },
}: CategoryPageProps) {
    const [dishes, setDishes] = useState<DishInterface[]>();
    const [categoryInfo, setCategoryInfo] = useState<CategoryAPI>();
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            return Promise.all([
                getByCategory(restaurant, lang, category),
                getByLink(restaurant, lang, category),
            ]);
        };

        fetchData().then(([ds, cat]) => {
            if (ds.rows.length === 0 || cat.rows.length === 0) {
                setNotFound(true);
            }

            setDishes(ds.rows);
            setCategoryInfo(cat.rows[0]);
        });
    }, [category, restaurant, lang]);

    if (notFound) {
        return (
            <NotFound
                restaurant={restaurant}
                backLink={`/restaurante/${restaurant}/${lang}`}
                bgImage={categoryInfo?.image}
            />
        );
    }

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
