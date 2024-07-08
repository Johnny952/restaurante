import React from 'react';
import { Box, Container, Grid, Typography, Card, CardContent, CardActions, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const MotionCard = motion(Card);

interface PlanProps {
    title: string;
    price: string;
    features: string[];
    isPopular?: boolean;
}

const PlanCard: React.FC<PlanProps> = ({ title, price, features, isPopular }) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <Grid item xs={12} sm={6} md={4} ref={ref}>
            <MotionCard
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8 }}
                sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '15px',
                    overflow: 'hidden',
                    bgcolor: 'background.paper',
                    border: isPopular ? 2 : 0,
                    borderColor: 'primary.main',
                    '&:hover': {
                        boxShadow: '0 8px 16px 0 rgba(255,107,53,0.2)',
                    },
                }}
            >
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h5" component="h3" gutterBottom sx={{ color: 'text.primary', fontWeight: 600 }}>
                        {title}
                    </Typography>
                    <Typography variant="h4" component="p" sx={{ color: 'primary.main', fontWeight: 700, mb: 2 }}>
                        {price}
                    </Typography>
                    {features.map((feature, index) => (
                        <Typography key={index} variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            • {feature}
                        </Typography>
                    ))}
                </CardContent>
                <CardActions>
                    <Button
                        fullWidth
                        variant={isPopular ? "contained" : "outlined"}
                        sx={{
                            mt: 2,
                            bgcolor: isPopular ? 'primary.main' : 'transparent',
                            color: isPopular ? 'background.default' : 'primary.main',
                            '&:hover': {
                                bgcolor: isPopular ? 'primary.dark' : 'rgba(255,107,53,0.1)',
                            },
                        }}
                    >
                        Elegir Plan
                    </Button>
                </CardActions>
            </MotionCard>
        </Grid>
    );
};

const PricingPlans: React.FC = () => {
    return (
        <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
            <Container maxWidth="lg">
                <Typography variant="h4" component="h4" align="center" gutterBottom sx={{
                    color: 'primary.main',
                    fontWeight: 700,
                    mb: 6
                }}>
                    Planes de Precios
                </Typography>
                <Grid container spacing={4}>
                    <PlanCard
                        title="Básico"
                        price="$29/mes"
                        features={[
                            "Menú digital para 1 restaurante",
                            "Hasta 100 elementos en el menú",
                            "Soporte por correo electrónico"
                        ]}
                    />
                    <PlanCard
                        title="Pro"
                        price="$79/mes"
                        features={[
                            "Menú digital para 3 restaurantes",
                            "Hasta 300 elementos en el menú",
                            "Procesamiento de pagos integrado",
                            "Soporte prioritario 24/7"
                        ]}
                        isPopular
                    />
                    <PlanCard
                        title="Empresarial"
                        price="Personalizado"
                        features={[
                            "Menús digitales ilimitados",
                            "Elementos de menú ilimitados",
                            "Integración API completa",
                            "Gerente de cuenta dedicado"
                        ]}
                    />
                </Grid>
            </Container>
        </Box>
    );
};

export default PricingPlans;