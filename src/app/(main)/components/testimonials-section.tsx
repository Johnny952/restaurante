import React from 'react';
import Slider from 'react-slick';
import { Box, Container, Typography, Rating, Avatar, Paper } from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { motion } from 'framer-motion';
// Importa los estilos CSS de slick-carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface TestimonialProps {
    quote: string;
    author: string;
    role: string;
    rating: number;
    image: string;
}

const testimonials: TestimonialProps[] = [
    {
        quote: "VirtualTable ha revolucionado la forma en que gestionamos nuestro restaurante. ¡Los clientes adoran nuestro nuevo menú digital!",
        author: "María Rodríguez",
        role: "Propietaria, La Cocina Feliz",
        rating: 5,
        image: "./testimonial1.png"
    },
    {
        quote: "Desde que implementamos el sistema de pedidos en línea de VirtualTable, nuestras ventas han aumentado un 30%. ¡Increíble!",
        author: "Carlos Gómez",
        role: "Gerente, Sabor Latino",
        rating: 4.5,
        image: "./testimonial2.png"
    },
    {
        quote: "Los análisis en tiempo real nos han permitido tomar decisiones más informadas. VirtualTable es una herramienta indispensable.",
        author: "Ana Martínez",
        role: "Dueña, Café del Parque",
        rating: 5,
        image: "./testimonial3.png"
    }
];

const MotionPaper = motion(Paper);

const TestimonialCard: React.FC<TestimonialProps> = ({ quote, author, role, rating, image }) => (
    <MotionPaper
        elevation={3}
        sx={{
            m: 2,
            p: 4,
            borderRadius: 4,
            backgroundColor: 'background.paper',
            transition: 'box-shadow 0.3s ease-in-out',
            '&:hover': {
                boxShadow: '0 8px 16px 0 rgba(255,107,53,0.2)',
            },
        }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
    >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar
                src={image}
                alt={author}
                sx={{ width: 100, height: 100, mb: 3, boxShadow: 3 }}
            />
            <FormatQuoteIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
            <Typography variant="body1" sx={{ mb: 3, fontStyle: 'italic', textAlign: 'center', color: 'text.primary' }}>
                {quote}
            </Typography>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold', color: 'text.primary' }}>
                {author}
            </Typography>
            <Typography variant="subtitle2" sx={{ mb: 2, color: 'text.secondary' }}>
                {role}
            </Typography>
            <Rating value={rating} precision={0.5} readOnly />
        </Box>
    </MotionPaper>
);

const Testimonials: React.FC = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        arrows: false,
        customPaging: function (i: number) {
            return (
                <Box
                    sx={{
                        width: 10,
                        height: 10,
                        bgcolor: 'primary.main',
                        borderRadius: '50%',
                        opacity: 0.5,
                        transition: 'opacity 0.3s',
                        '&:hover': {
                            opacity: 1,
                        },
                    }}
                />
            );
        },
    };

    return (
        <Box sx={{ py: 8, backgroundColor: 'background.default' }}>
            <Container maxWidth="lg">
                <Typography
                    variant="h4"
                    component="h4"
                    align="center"
                    gutterBottom
                    sx={{
                        mb: 6,
                        fontWeight: 700,
                        color: 'primary.main'
                    }}
                >
                    Lo que dicen nuestros clientes
                </Typography>
                <Slider {...settings}>
                    {testimonials.map((testimonial, index) => (
                        <TestimonialCard key={index} {...testimonial} />
                    ))}
                </Slider>
            </Container>
        </Box>
    );
};

export default Testimonials;