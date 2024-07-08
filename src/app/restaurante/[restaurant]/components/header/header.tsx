import { Box, Container, Divider, Grid } from "@mui/material";
import { HeaderInterface } from "./header.d";
import LogoAnimated from "./logo-animated";
import TitleAnimated from "./title-animated";
import ContentLoader from "react-content-loader";
import AnimatedWrapper from "./animated-wrapper";

const logoWidth = 500;
const logoHeight = 500;

export default function RestaurantHeader({
    title = "LANGUAGES",
    image,
    loading = false,
}: HeaderInterface) {
    return (
        <AnimatedWrapper>
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
                                        image={image || ""}
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
        </AnimatedWrapper>
    );
}
