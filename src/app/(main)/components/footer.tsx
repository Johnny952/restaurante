import React from "react";
import {
    Box,
    Container,
    Grid,
    Typography,
    TextField,
    Button,
    Link,
    IconButton,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const Footer: React.FC = () => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Newsletter subscription submitted");
    };

    return (
        <Box
            component="footer"
            sx={{
                bgcolor: "background.paper",
                color: "text.primary",
                py: 6,
                mt: "auto",
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={4}>
                        <MotionBox
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Typography variant="h6" gutterBottom>
                                Enlaces Rápidos
                            </Typography>
                            <Box>
                                {[
                                    "Inicio",
                                    "Características",
                                    "Precios",
                                    "Contáctanos",
                                ].map((text) => (
                                    <Link
                                        key={text}
                                        href="#"
                                        color="inherit"
                                        sx={{
                                            display: "block",
                                            mb: 1,
                                            textDecoration: "none",
                                            "&:hover": {
                                                color: "primary.main",
                                                textDecoration: "underline",
                                            },
                                        }}
                                    >
                                        {text}
                                    </Link>
                                ))}
                            </Box>
                        </MotionBox>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <MotionBox
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <Typography variant="h6" gutterBottom>
                                Suscríbete al Newsletter
                            </Typography>
                            <Box
                                component="form"
                                onSubmit={handleSubmit}
                                noValidate
                            >
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    required
                                    id="email"
                                    label="Correo Electrónico"
                                    name="email"
                                    autoComplete="email"
                                    variant="outlined"
                                    sx={{
                                        bgcolor: "background.default",
                                        borderRadius: 1,
                                        "& .MuiOutlinedInput-root": {
                                            "& fieldset": {
                                                borderColor: "primary.main",
                                            },
                                            "&:hover fieldset": {
                                                borderColor: "primary.light",
                                            },
                                            "&.Mui-focused fieldset": {
                                                borderColor: "primary.main",
                                            },
                                        },
                                    }}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
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
                                    Suscribirse
                                </Button>
                            </Box>
                        </MotionBox>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <MotionBox
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <Typography variant="h6" gutterBottom>
                                Síguenos
                            </Typography>
                            <Box>
                                {[
                                    {
                                        icon: <FacebookIcon />,
                                        name: "Facebook",
                                    },
                                    { icon: <TwitterIcon />, name: "Twitter" },
                                    {
                                        icon: <InstagramIcon />,
                                        name: "Instagram",
                                    },
                                    {
                                        icon: <LinkedInIcon />,
                                        name: "LinkedIn",
                                    },
                                ].map((network) => (
                                    <IconButton
                                        key={network.name}
                                        aria-label={`${network.name} link`}
                                        sx={{
                                            color: "text.primary",
                                            "&:hover": {
                                                color: "primary.main",
                                                bgcolor:
                                                    "rgba(255, 107, 53, 0.1)",
                                            },
                                        }}
                                    >
                                        {network.icon}
                                    </IconButton>
                                ))}
                            </Box>
                        </MotionBox>
                    </Grid>
                </Grid>

                <Typography variant="body2" align="center" sx={{ mt: 4 }}>
                    © {new Date().getFullYear()} Tu Empresa de Menús Digitales.
                    Todos los derechos reservados.
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer;
