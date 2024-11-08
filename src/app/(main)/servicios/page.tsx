"use client";
import React from "react";
import { Box, Container, Grid, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import {
    FaChartBar,
    FaShoppingBasket,
    FaWifi,
    FaUserCircle,
} from "react-icons/fa";

const MotionBox = motion(Box);

const ServicesPage: React.FC = () => {
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
                                <Typography
                                    variant="h3"
                                    gutterBottom
                                    sx={{ color: "primary.main" }}
                                >
                                    Nuestros Servicios
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    Descubre cómo Virtual Table puede
                                    transformar tu negocio de restaurante y
                                    mejorar la experiencia de tus clientes.
                                </Typography>
                            </MotionBox>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <MotionBox
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <img
                                    src="/mission.png"
                                    alt="Nuestros Servicios"
                                    style={{
                                        width: "100%",
                                        height: "auto",
                                        borderRadius: 8,
                                        maxHeight: 400,
                                    }}
                                />
                            </MotionBox>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Sección de Servicios */}
            <Box
                sx={{
                    bgcolor: "background.default",
                    py: 8,
                }}
            >
                <Container maxWidth="lg">
                    <Typography
                        variant="h4"
                        gutterBottom
                        sx={{ color: "primary.main" }}
                    >
                        Descubre nuestros servicios
                    </Typography>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={6} md={3}>
                            <MotionBox
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                style={{ height: "100%" }}
                            >
                                <Box
                                    sx={{
                                        bgcolor: "background.paper",
                                        p: 4,
                                        borderRadius: 2,
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        textAlign: "center",
                                    }}
                                >
                                    <FaChartBar size={48} color="#2196f3" />
                                    <Typography variant="h6" gutterBottom>
                                        Análisis de Datos
                                    </Typography>
                                    <Typography variant="body1" paragraph>
                                        Obtén valiosos insights sobre el
                                        rendimiento de tu restaurante con
                                        nuestras herramientas avanzadas de
                                        análisis de datos.
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            mt: "auto",
                                            bgcolor: "primary.main",
                                            color: "background.default",
                                            "&:hover": {
                                                bgcolor: "primary.dark",
                                            },
                                        }}
                                    >
                                        Saber más
                                    </Button>
                                </Box>
                            </MotionBox>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <MotionBox
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                style={{ height: "100%" }}
                            >
                                <Box
                                    sx={{
                                        bgcolor: "background.paper",
                                        p: 4,
                                        borderRadius: 2,
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        textAlign: "center",
                                    }}
                                >
                                    <FaShoppingBasket
                                        size={48}
                                        color="#2196f3"
                                    />
                                    <Typography variant="h6" gutterBottom>
                                        Gestión de Pedidos
                                    </Typography>
                                    <Typography variant="body1" paragraph>
                                        Automatiza y optimiza el proceso de toma
                                        de pedidos con nuestra solución
                                        integrada para la cocina y el salón.
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            mt: "auto",
                                            bgcolor: "primary.main",
                                            color: "background.default",
                                            "&:hover": {
                                                bgcolor: "primary.dark",
                                            },
                                        }}
                                    >
                                        Saber más
                                    </Button>
                                </Box>
                            </MotionBox>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <MotionBox
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                style={{ height: "100%" }}
                            >
                                <Box
                                    sx={{
                                        bgcolor: "background.paper",
                                        p: 4,
                                        borderRadius: 2,
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        textAlign: "center",
                                    }}
                                >
                                    <FaWifi size={48} color="#2196f3" />
                                    <Typography variant="h6" gutterBottom>
                                        Menús Digitales
                                    </Typography>
                                    <Typography variant="body1" paragraph>
                                        Ofrece una experiencia moderna y sin
                                        problemas a tus clientes con nuestros
                                        menús digitales personalizables.
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            mt: "auto",
                                            bgcolor: "primary.main",
                                            color: "background.default",
                                            "&:hover": {
                                                bgcolor: "primary.dark",
                                            },
                                        }}
                                    >
                                        Saber más
                                    </Button>
                                </Box>
                            </MotionBox>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <MotionBox
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                style={{ height: "100%" }}
                            >
                                <Box
                                    sx={{
                                        bgcolor: "background.paper",
                                        p: 4,
                                        borderRadius: 2,
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        textAlign: "center",
                                    }}
                                >
                                    <FaUserCircle size={48} color="#2196f3" />
                                    <Typography variant="h6" gutterBottom>
                                        Mesero Virtual
                                    </Typography>
                                    <Typography variant="body1" paragraph>
                                        Mejora la atención a tus clientes con
                                        nuestro asistente virtual impulsado por
                                        IA, disponible las 24 horas.
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            mt: "auto",
                                            bgcolor: "primary.main",
                                            color: "background.default",
                                            "&:hover": {
                                                bgcolor: "primary.dark",
                                            },
                                        }}
                                    >
                                        Saber más
                                    </Button>
                                </Box>
                            </MotionBox>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
};

export default ServicesPage;
