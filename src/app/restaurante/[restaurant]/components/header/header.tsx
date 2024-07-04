"use client";
import { Box, Container, Divider, Grid } from "@mui/material";
import { HeaderInterface } from "./header.d";
import { getByLink } from "@/app/api/restaurants/get";
import { notFound } from "next/navigation";
import LogoAnimated from "./logo-animated";
import TitleAnimated from "./title-animated";
import { useEffect, useState } from "react";
import { RestaurantInterface } from "@/app/api/restaurants/index.types";
import useSnackStore from "@/store/snackbar-store";
import ContentLoader from "react-content-loader";

const logoWidth = 500;
const logoHeight = 500;

export default function RestaurantHeader({
    title = "LANGUAGES",
    restaurant: restaurantLink,
    loading = false,
}: HeaderInterface) {
    const [restaurant, setRestaurant] = useState<RestaurantInterface>();
    const snackError = useSnackStore((state) => state.setOpenError);

    useEffect(() => {
        const fetchData = async () => {
            return getByLink(restaurantLink);
        };

        fetchData()
            .then((data) => {
                if (data.rows.length === 0) {
                    notFound();
                }
                setRestaurant(data.rows[0]);
            })
            .catch((error) => {
                snackError(`Ocurrió un error: ${error.toString()}`);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [restaurantLink]);

    return (
        <div
            style={{
                boxShadow: "inset 0px 100px 50px 0px rgba(0,0,0,0.70)",
            }}
        >
            <Container>
                <Grid container rowSpacing={3}>
                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="center">
                            <Box
                                width={Math.floor(logoWidth / 2)}
                                height={Math.floor(logoHeight / 2)}
                            >
                                <LogoAnimated
                                    loading={loading}
                                    image={restaurant?.image || ""}
                                />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box
                            display="flex"
                            justifyContent="center"
                            textAlign="center"
                        >
                            {loading ? (
                                <ContentLoader
                                    speed={2}
                                    width={440}
                                    height={32}
                                    viewBox="0 0 440 32"
                                    backgroundColor="#000000"
                                    foregroundColor="#ecebeb"
                                >
                                    <rect
                                        x="0"
                                        y="0"
                                        rx="8"
                                        ry="8"
                                        width="440"
                                        height="32"
                                    />
                                </ContentLoader>
                            ) : (
                                <TitleAnimated title={title} />
                            )}
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            <Divider
                variant="fullWidth"
                sx={{
                    borderColor: "rgba(255, 255, 255, 0.2)",
                    paddingY: "20px",
                }}
            />
        </div>
    );
}
