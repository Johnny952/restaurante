import React from "react";
import {
    Box,
    Container,
    Grid,
    Typography,
    Card,
    CardContent,
} from "@mui/material";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import PaymentIcon from "@mui/icons-material/Payment";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import AnalyticsIcon from "@mui/icons-material/Analytics";

const MotionCard = motion(Card);

const FeatureCard: React.FC<{
    title: string;
    description: string;
    icon: React.ReactNode;
}> = ({ title, description, icon }) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <Grid item xs={12} sm={6} md={3} ref={ref}>
            <MotionCard
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8 }}
                sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "15px",
                    overflow: "hidden",
                    bgcolor: "background.paper",
                    "&:hover": {
                        boxShadow: "0 8px 16px 0 rgba(255,107,53,0.2)",
                    },
                }}
            >
                <CardContent
                    sx={{
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                    }}
                >
                    <Box sx={{ color: "primary.main", fontSize: 60, mb: 2 }}>
                        {icon}
                    </Box>
                    <Typography
                        variant="h5"
                        component="h3"
                        gutterBottom
                        sx={{ color: "text.primary", fontWeight: 600 }}
                    >
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                </CardContent>
            </MotionCard>
        </Grid>
    );
};

const Features: React.FC = () => {
    return (
        <Box sx={{ py: 8, bgcolor: "background.default" }}>
            <Container maxWidth="lg">
                <Typography
                    variant="h4"
                    component="h4"
                    align="center"
                    gutterBottom
                    sx={{
                        color: "primary.main",
                        fontWeight: 700,
                        mb: 6,
                    }}
                >
                    Características Principales
                </Typography>
                <Grid container spacing={4}>
                    <FeatureCard
                        title="Menús Digitales"
                        description="Crea y actualiza fácilmente tus menús digitales, accesibles mediante códigos QR."
                        icon={<RestaurantMenuIcon />}
                    />
                    <FeatureCard
                        title="Pagos Integrados"
                        description="Procesa pagos de manera segura directamente desde los dispositivos de los clientes."
                        icon={<PaymentIcon />}
                    />
                    <FeatureCard
                        title="Gestión de Mesas"
                        description="Optimiza la asignación de mesas y el seguimiento de pedidos en tiempo real."
                        icon={<TableRestaurantIcon />}
                    />
                    <FeatureCard
                        title="Análisis Financiero"
                        description="Obtén informes detallados y análisis para optimizar tu negocio."
                        icon={<AnalyticsIcon />}
                    />
                </Grid>
            </Container>
        </Box>
    );
};

export default Features;
