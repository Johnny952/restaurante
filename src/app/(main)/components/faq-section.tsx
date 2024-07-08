import React from "react";
import {
    Box,
    Container,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Importa los iconos necesarios
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import PaymentIcon from "@mui/icons-material/Payment";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import ReceiptIcon from "@mui/icons-material/Receipt";

const MotionAccordion = motion(Accordion);

interface FAQItem {
    question: string;
    answer: string;
    icon: React.ReactNode;
}

const faqData: FAQItem[] = [
    {
        question: "¿Cómo funciona el hosting de menús digitales?",
        answer: "Nuestro servicio de hosting de menús digitales te permite cargar y actualizar fácilmente tu menú en línea. Los clientes pueden acceder a él escaneando un código QR o a través de un enlace directo.",
        icon: <RestaurantMenuIcon />,
    },
    {
        question: "¿Cómo se procesan los pagos de los clientes?",
        answer: "Ofrecemos una plataforma segura de procesamiento de pagos integrada. Los clientes pueden pagar directamente desde sus dispositivos, ya sea en la mesa o para pedidos para llevar.",
        icon: <PaymentIcon />,
    },
    {
        question: "¿Cómo funciona el sistema de gestión de mesas y pedidos?",
        answer: "Nuestro sistema permite a los meseros tomar pedidos digitalmente y enviarlos directamente a la cocina. También facilita la asignación de mesas y el seguimiento de pedidos en tiempo real.",
        icon: <TableRestaurantIcon />,
    },
    {
        question: "¿Qué herramientas de administración financiera ofrecen?",
        answer: "Proporcionamos un panel de control completo con informes de ventas, análisis de rendimiento de platos, gestión de inventario y proyecciones financieras para ayudarte a optimizar tu negocio.",
        icon: <ReceiptIcon />,
    },
];

const FAQSection: React.FC = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <Box sx={{ py: 8, bgcolor: "background.default" }} ref={ref}>
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
                    Preguntas Frecuentes
                </Typography>
                <Grid container spacing={3}>
                    {faqData.map((faq: FAQItem, index: number) => (
                        <Grid item xs={12} key={index}>
                            <MotionAccordion
                                initial={{ opacity: 0, y: 20 }}
                                animate={
                                    inView
                                        ? { opacity: 1, y: 0 }
                                        : { opacity: 0, y: 20 }
                                }
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                }}
                                sx={{
                                    bgcolor: "background.paper",
                                    "&:before": {
                                        display: "none",
                                    },
                                    "&:not(:last-child)": {
                                        borderBottom: 0,
                                    },
                                    "&:first-of-type": {
                                        borderTopLeftRadius: "15px",
                                        borderTopRightRadius: "15px",
                                    },
                                    "&:last-of-type": {
                                        borderBottomLeftRadius: "15px",
                                        borderBottomRightRadius: "15px",
                                    },
                                }}
                            >
                                <AccordionSummary
                                    expandIcon={
                                        <ExpandMoreIcon
                                            sx={{ color: "primary.main" }}
                                        />
                                    }
                                    aria-controls={`panel${index + 1}-content`}
                                    id={`panel${index + 1}-header`}
                                    sx={{
                                        "& .MuiAccordionSummary-content": {
                                            alignItems: "center",
                                        },
                                    }}
                                >
                                    <Box sx={{ mr: 2, color: "primary.main" }}>
                                        {faq.icon}
                                    </Box>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 600,
                                            color: "text.primary",
                                        }}
                                    >
                                        {faq.question}
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography
                                        sx={{ color: "text.secondary" }}
                                    >
                                        {faq.answer}
                                    </Typography>
                                </AccordionDetails>
                            </MotionAccordion>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default FAQSection;
