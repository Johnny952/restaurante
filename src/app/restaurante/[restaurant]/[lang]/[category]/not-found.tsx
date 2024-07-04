import { Box, Container, Grid, Typography } from "@mui/material";
import Background from "../../components/background/background";
import RestaurantHeader from "../../components/header/header";
import MenuButton from "../components/menu-button";
import BackButton from "./components/back-button";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { purple } from "@mui/material/colors";
import notFoundImg from "@/../public/not-found-dish.png";

export default function NotFound() {
    return (
        <Background image={notFoundImg.src}>
            <RestaurantHeader
                title="Categoría sin platos"
                restaurant="johnny"
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
                                ¡Ups! Categoría sin platos
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 3 }}>
                                Lo sentimos, los platos asociados a esta categoría no están
                                disponible o no existen aún.
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            <MenuButton />
            <BackButton />
        </Background>
    );
}
