import { Box, Button, Container, Grid, Typography } from "@mui/material";
import Background from "@/app/restaurante/[restaurant]/components/background/background";
import RestaurantHeader from "@/app/restaurante/[restaurant]/components/header/header";
import Link from "next/link";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { purple } from "@mui/material/colors";
import notFoundImg from "@/../public/not-found-dish.png";
import ResponsiveNavigation from "@/app/restaurante/[restaurant]/components/response-navigation";

export default function NotFound({
    image,
    backLink,
}: {
    image: string;
    backLink: string;
}) {
    return (
        <Background image={notFoundImg.src}>
            <RestaurantHeader
                title="Plato no encontrado"
                image={image}
                loading={false}
            />
            <Container sx={{ paddingY: "60px" }}>
                <Grid
                    container
                    spacing={2}
                    rowSpacing={2}
                    justifyContent="center"
                >
                    <Grid item xs={12} sm={8} md={6} textAlign="center">
                        <Box
                            sx={{
                                backgroundColor: "rgba(0, 0, 0, 0.7)",
                                borderRadius: "16px",
                                padding: "32px",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <ErrorOutlineIcon
                                sx={{ fontSize: 80, color: purple[500], mb: 2 }}
                            />
                            <Typography variant="h4" gutterBottom>
                                ¡Ups! Plato no encontrado
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 3 }}>
                                Lo sentimos, el plato que estás buscando no está
                                disponible o no existe.
                            </Typography>
                            <Link href={backLink} passHref>
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: purple[500],
                                        ":hover": {
                                            backgroundColor: purple[700],
                                        },
                                    }}
                                >
                                    Volver al menú
                                </Button>
                            </Link>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            <ResponsiveNavigation />
        </Background>
    );
}
