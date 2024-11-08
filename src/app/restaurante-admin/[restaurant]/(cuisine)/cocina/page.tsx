"use client";
import React, { useEffect, useState } from "react";
import { ThemeProvider, CssBaseline, Box, Container } from "@mui/material";
import { KitchenView } from "./components/kitchen-view";
import { theme } from "./components/theme";
import { Header } from "./components/header";
// import { getBackground } from "@/app/api/restaurants/get";
import { notFound } from "next/navigation";
import { RestaurantType } from "@/lib/models/restaurant";

const CuisinePage = ({
    params: { restaurant: restaurantLink },
}: {
    params: { restaurant: string };
}) => {
    const [restaurant, setRestaurant] = useState<RestaurantType | null>(null);

    useEffect(() => {
        const fetchData = () => {
            // return getBackground(restaurantLink);
            return Promise.resolve(null)
        };

        fetchData().then((data) => {
            setRestaurant(data);
        });
    }, [restaurantLink]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "100vh",
                }}
            >
                <Header
                    restaurantName={restaurant?.name || ""}
                    logoUrl={restaurant?.logo || ""}
                />
                <Container maxWidth="lg" sx={{ flexGrow: 1, py: 3 }}>
                    <KitchenView />
                </Container>
            </Box>
        </ThemeProvider>
    );
};

export default CuisinePage;
