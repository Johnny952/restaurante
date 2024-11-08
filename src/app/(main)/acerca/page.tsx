"use client";
import React from "react";
import {
    Box,
    Container,
    Grid,
    Typography,
    Button,
    Link,
    Divider,
} from "@mui/material";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

export default function AboutPage() {
    return (
        <Box
            sx={{
                bgcolor: "black",
                color: "text.primary",
                pt: 8,
            }}
        >
            {/* Sección Hero */}
            <Box
                sx={{
                    bgcolor: "background.paper",
                    py: 12,
                }}
            >
                <Container maxWidth="lg">
                    <Grid container spacing={6} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <MotionBox
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <img
                                    src="/about-us-hero.png"
                                    alt="Acerca de Nosotros"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        borderRadius: 8,
                                        maxHeight: 400,
                                    }}
                                />
                            </MotionBox>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <MotionBox
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <Typography
                                    variant="h3"
                                    gutterBottom
                                    sx={{
                                        color: "primary.main",
                                    }}
                                >
                                    Revolucionando la Experiencia Restaurantera
                                </Typography>
                                <Typography
                                    variant="body1"
                                    paragraph
                                    sx={{ color: "text.secondary" }}
                                >
                                    En Virtual Table, nos apasiona transformar
                                    la industria de los restaurantes con
                                    soluciones digitales innovadoras. Nuestra
                                    misión es simplificar los procesos, mejorar
                                    la eficiencia y brindar una experiencia
                                    gastronómica excepcional tanto para los
                                    propietarios de restaurantes como para sus
                                    clientes.
                                </Typography>
                                <Box sx={{ mt: 4 }}>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        sx={{
                                            bgcolor: "primary.main",
                                            color: "background.default",
                                            "&:hover": {
                                                bgcolor: "primary.dark",
                                            },
                                            px: 4,
                                            py: 1.5,
                                        }}
                                    >
                                        Aprende Más
                                    </Button>
                                    <Link
                                        href="/contacto"
                                        color="primary.main"
                                        underline="none"
                                        sx={{
                                            ml: 2,
                                            "&:hover": {
                                                color: "primary.dark",
                                                textDecoration: "underline",
                                            },
                                        }}
                                    >
                                        Contáctanos
                                    </Link>
                                </Box>
                            </MotionBox>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Nuestra Misión */}
            <Box
                sx={{
                    bgcolor: "background.default",
                    py: 8,
                }}
            >
                <Container maxWidth="lg">
                    <MotionBox
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Typography
                            variant="h4"
                            gutterBottom
                            sx={{
                                color: "primary.main",
                            }}
                        >
                            Nuestra Misión
                        </Typography>
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={6}>
                                <Typography variant="body1" paragraph>
                                    En el corazón de Virtual Table se encuentra
                                    una misión simple pero poderosa: empoderar a
                                    los restaurantes con herramientas digitales
                                    de vanguardia que simplifiquen las
                                    operaciones, mejoren la experiencia del
                                    cliente y abran nuevos caminos para el
                                    crecimiento. Creemos que al aprovechar la
                                    tecnología, podemos ayudar a nuestros socios
                                    a prosperar en un mercado cada vez más
                                    competitivo.
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <img
                                    src="/mission.png"
                                    alt="Nuestra Misión"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        borderRadius: 8,
                                        maxHeight: 300,
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </MotionBox>
                </Container>
            </Box>

            {/* Nuestra Visión */}
            <Box
                sx={{
                    bgcolor: "background.paper",
                    py: 8,
                }}
            >
                <Container maxWidth="lg">
                    <MotionBox
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Typography
                            variant="h4"
                            gutterBottom
                            sx={{ color: "primary.main" }}
                        >
                            Nuestra Visión
                        </Typography>
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={6}>
                                <img
                                    src="/mission.png"
                                    alt="Nuestra Visión"
                                    style={{
                                        width: "100%",
                                        height: "auto",
                                        borderRadius: 8,
                                        maxHeight: 300,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="body1" paragraph>
                                    Nuestra visión es convertirnos en el
                                    principal proveedor de soluciones digitales
                                    integrales para la industria de los
                                    restaurantes. Aspiramos a empoderar a
                                    nuestros clientes con las herramientas y los
                                    conocimientos que necesitan para prosperar
                                    en la era moderna de la gastronomía, donde
                                    las expectativas de los clientes y los
                                    avances tecnológicos evolucionan
                                    constantemente. Al innovar y adaptarnos
                                    continuamente al panorama cambiante,
                                    aspiramos a ser el socio de confianza que
                                    ayuda a nuestros clientes a mantenerse a la
                                    vanguardia y brindar experiencias
                                    excepcionales a sus comensales.
                                </Typography>
                            </Grid>
                        </Grid>
                    </MotionBox>
                </Container>
            </Box>

            {/* Nuestros Inicios */}
            <Box
                sx={{
                    bgcolor: "background.default",
                    py: 8,
                }}
            >
                <Container maxWidth="lg">
                    <MotionBox
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Typography
                            variant="h4"
                            gutterBottom
                            sx={{ color: "primary.main" }}
                        >
                            Nuestros Inicios
                        </Typography>
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={6}>
                                <Typography variant="body1" paragraph>
                                    Virtual Table fue fundada por dos jóvenes
                                    entusiastas de la tecnología que vieron el
                                    enorme potencial de revolucionar la
                                    industria de los restaurantes. Impulsados
                                    por una pasión por la innovación y un
                                    profundo conocimiento de los desafíos que
                                    enfrentan los propietarios de restaurantes,
                                    se propusieron crear una plataforma integral
                                    que simplificara las operaciones, mejorara
                                    la experiencia del cliente y empoderara a
                                    sus clientes para que prosperaran en la era
                                    digital.
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <img
                                    src="/mission.png"
                                    alt="Nuestros Inicios"
                                    style={{
                                        width: "100%",
                                        height: "auto",
                                        borderRadius: 8,
                                        maxHeight: 300,
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </MotionBox>
                </Container>
            </Box>
        </Box>
    );
}
