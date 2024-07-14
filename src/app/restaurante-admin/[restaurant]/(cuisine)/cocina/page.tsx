"use client";
import React, { useEffect, useState } from "react";
import { ThemeProvider, CssBaseline, Box, Container } from "@mui/material";
import { KitchenView } from "./components/kitchen-view";
import { theme } from "./components/theme";
import { Header } from "./components/header";
import { getBackground } from "@/app/api/restaurants/get";
import { notFound } from "next/navigation";

const CuisinePage = ({
    params: { restaurant: restaurantLink },
}: {
    params: { restaurant: string };
}) => {
    const [restaurant, setRestaurant] = useState<{
        background: string;
        image: string;
        name: string;
    } | null>(null);

    useEffect(() => {
        const fetchData = () => {
            return getBackground(restaurantLink);
        };

        fetchData().then((data) => {
            if (data.length === 0) {
                return notFound();
            }
            setRestaurant(data[0]);
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
                    logoUrl={restaurant?.image || ""}
                />
                <Container maxWidth="lg" sx={{ flexGrow: 1, py: 3 }}>
                    <KitchenView />
                </Container>
            </Box>
        </ThemeProvider>
    );
};

export default CuisinePage;
