"use client";
import {
    Box,
    Container,
    Divider,
    Grid,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import LogoAnimated from "./logo-animated";
import TitleAnimated from "./title-animated";
import ContentLoader from "react-content-loader";
import AnimatedWrapper from "./animated-wrapper";

const desktopLogoWidth = 500;
const desktopLogoHeight = 500;
const mobileLogoWidth = 100;
const mobileLogoHeight = 100;

interface Props {
    title?: string;
    loading?: boolean;
    image?: string | null;
}

export default function RestaurantHeader({
    title = "LANGUAGES",
    image,
    loading = false,
}: Props) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <AnimatedWrapper>
            <div
                style={{
                    boxShadow: "inset 0px 100px 50px 0px rgba(0,0,0,0.70)",
                }}
            >
                <Container>
                    {isMobile ? (
                        <Box display="flex" alignItems="center" py={2}>
                            <Box
                                width={mobileLogoWidth}
                                height={mobileLogoHeight}
                                mr={2}
                            >
                                <LogoAnimated
                                    loading={loading}
                                    image={image || ""}
                                    isMobile={true}
                                />
                            </Box>
                            <Box flex={1} display="flex" justifyContent="left">
                                {loading ? (
                                    <ContentLoader
                                        speed={2}
                                        width={180}
                                        height={24}
                                        viewBox="0 0 180 24"
                                        backgroundColor="#000000"
                                        foregroundColor="#ecebeb"
                                    >
                                        <rect
                                            x="0"
                                            y="0"
                                            rx="4"
                                            ry="4"
                                            width="180"
                                            height="24"
                                        />
                                    </ContentLoader>
                                ) : (
                                    <TitleAnimated
                                        title={title}
                                        isMobile={true}
                                    />
                                )}
                            </Box>
                        </Box>
                    ) : (
                        <Grid
                            container
                            direction="column"
                            alignItems="center"
                            spacing={3}
                        >
                            <Grid item>
                                <Box
                                    width={Math.floor(desktopLogoWidth / 2)}
                                    height={Math.floor(desktopLogoHeight / 2)}
                                >
                                    <LogoAnimated
                                        loading={loading}
                                        image={image || ""}
                                        isMobile={false}
                                    />
                                </Box>
                            </Grid>
                            <Grid item>
                                <Box display="flex" justifyContent="center">
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
                                        <TitleAnimated
                                            title={title}
                                            isMobile={false}
                                        />
                                    )}
                                </Box>
                            </Grid>
                        </Grid>
                    )}
                </Container>
                <Divider
                    variant="fullWidth"
                    sx={{
                        borderColor: "rgba(255, 255, 255, 0.2)",
                        paddingY: isMobile ? "10px" : "20px",
                    }}
                />
            </div>
        </AnimatedWrapper>
    );
}
