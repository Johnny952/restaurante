import { Box, Button, Container, Grid, Typography } from "@mui/material";
import Background from "../../../components/background/background";
import RestaurantHeader from "../../../components/header/header";
import MenuButton from "../../components/menu-button";
import BackButton from "./back-button";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { purple } from "@mui/material/colors";
import notFoundImg from "@/../public/not-found-dish.png";
import Link from "next/link";

export default function NotFound({
    restaurant,
    backLink,
    bgImage,
    title,
    description,
}: {
    restaurant: string;
    backLink: string;
    bgImage?: string;
    title: string;
    description?: string;
}) {
    return (
        <Background image={bgImage || notFoundImg.src}>
            <RestaurantHeader
                title={title}
                restaurant={restaurant}
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
                                ¡Ups! {title}
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 3 }}>
                                {description}
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
            <MenuButton />
            <BackButton />
        </Background>
    );
}
