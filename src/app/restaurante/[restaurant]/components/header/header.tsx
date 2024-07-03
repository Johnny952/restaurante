import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import { HeaderInterface } from "./header.d";
import { getByLink } from "@/app/api/restaurants/get";
import { notFound } from "next/navigation";
import LogoAnimated from "./logo-animated";
import TitleAnimated from "./title-animated";

const logoWidth = 500;
const logoHeight = 500;

export default async function RestaurantHeader({
    title = "LANGUAGES",
    restaurant,
}: HeaderInterface) {
    const restauranteInformation = (await getByLink(restaurant)).rows;
    if (restauranteInformation.length === 0) {
        notFound();
    }
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
                                    image={restauranteInformation[0].image}
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
                            <TitleAnimated title={title} />
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
