"use client";
import React from "react";
import {
    Box,
    Container,
    Grid,
    Typography,
    TextField,
    Button,
} from "@mui/material";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const ContactPage: React.FC = () => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        event.currentTarget.reset();
    };

    return (
        <Box
            sx={{
                bgcolor: "black",
                color: "text.primary",
                pt: 8,
            }}
        >
            <Box
                sx={{
                    bgcolor: "background.default",
                    color: "text.primary",
                    py: 8,
                }}
            >
                <Container maxWidth="lg">
                    <Grid container spacing={6}>
                        <Grid item xs={12} md={6}>
                            <MotionBox
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <Typography variant="h3" gutterBottom>
                                    Contáctanos
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    ¿Tienes alguna pregunta o comentario?
                                    Estaremos encantados de asistirte. Completa
                                    el formulario y nos pondremos en contacto
                                    contigo a la brevedad.
                                </Typography>
                                <Box
                                    component="form"
                                    onSubmit={handleSubmit}
                                    noValidate
                                    sx={{
                                        mt: 4,
                                    }}
                                >
                                    <TextField
                                        name="name"
                                        label="Nombre"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        sx={{
                                            mb: 2,
                                            bgcolor: "background.paper",
                                            borderRadius: 1,
                                            "& .MuiOutlinedInput-root": {
                                                "& fieldset": {
                                                    borderColor: "primary.main",
                                                },
                                                "&:hover fieldset": {
                                                    borderColor:
                                                        "primary.light",
                                                },
                                                "&.Mui-focused fieldset": {
                                                    borderColor: "primary.main",
                                                },
                                            },
                                        }}
                                    />
                                    <TextField
                                        name="email"
                                        label="Correo Electrónico"
                                        type="email"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        sx={{
                                            mb: 2,
                                            bgcolor: "background.paper",
                                            borderRadius: 1,
                                            "& .MuiOutlinedInput-root": {
                                                "& fieldset": {
                                                    borderColor: "primary.main",
                                                },
                                                "&:hover fieldset": {
                                                    borderColor:
                                                        "primary.light",
                                                },
                                                "&.Mui-focused fieldset": {
                                                    borderColor: "primary.main",
                                                },
                                            },
                                        }}
                                    />
                                    <TextField
                                        name="message"
                                        label="Mensaje"
                                        variant="outlined"
                                        required
                                        multiline
                                        rows={4}
                                        fullWidth
                                        sx={{
                                            mb: 2,
                                            bgcolor: "background.paper",
                                            borderRadius: 1,
                                            "& .MuiOutlinedInput-root": {
                                                "& fieldset": {
                                                    borderColor: "primary.main",
                                                },
                                                "&:hover fieldset": {
                                                    borderColor:
                                                        "primary.light",
                                                },
                                                "&.Mui-focused fieldset": {
                                                    borderColor: "primary.main",
                                                },
                                            },
                                        }}
                                    />
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        sx={{
                                            mt: 2,
                                            bgcolor: "primary.main",
                                            color: "background.default",
                                            "&:hover": {
                                                bgcolor: "primary.dark",
                                            },
                                        }}
                                    >
                                        Enviar Mensaje
                                    </Button>
                                </Box>
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
                                    alt="Contacto"
                                    style={{
                                        width: "100%",
                                        height: "auto",
                                        borderRadius: 8,
                                        maxHeight: 500,
                                    }}
                                />
                            </MotionBox>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
};

export default ContactPage;
