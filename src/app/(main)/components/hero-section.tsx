import React from 'react';
import { Box, Container, Typography, Button, Grid } from '@mui/material';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const HeroSection: React.FC = () => {
    return (
        <Box
            sx={{
                backgroundImage: 'url(/background.jpeg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                }
            }}
        >
            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <MotionBox
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <Typography variant="h1" gutterBottom sx={{
                                color: 'primary.main',
                                fontWeight: 700,
                                fontSize: { xs: '2.5rem', sm: '3rem', md: '4rem' },
                                lineHeight: 1.2,
                            }}>
                                Revoluciona tu restaurante con menús digitales
                            </Typography>
                            <Typography variant="h5" paragraph sx={{
                                color: 'white',
                                mb: 4,
                                fontWeight: 400,
                            }}>
                                Hosting de menús y automatización para el éxito de tu negocio
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                                <Button
                                    variant="contained"
                                    size="large"
                                    sx={{
                                        bgcolor: 'primary.main',
                                        color: 'background.default',
                                        '&:hover': { bgcolor: 'primary.dark' },
                                        px: 4,
                                        py: 1.5,
                                    }}
                                >
                                    Prueba gratis 30 días
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="large"
                                    sx={{
                                        color: 'primary.main',
                                        borderColor: 'primary.main',
                                        px: 4,
                                        py: 1.5,
                                        '&:hover': { borderColor: 'primary.light', bgcolor: 'rgba(255, 107, 53, 0.1)' }
                                    }}
                                >
                                    Aprender más
                                </Button>
                            </Box>
                        </MotionBox>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default HeroSection;