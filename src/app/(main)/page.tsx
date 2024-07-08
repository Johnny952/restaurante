"use client";
import styles from "./page.module.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "./components/header";
import HeroSection from "./components/hero-section";
import Features from "./components/features-section";
import InteractiveDemo from "./components/interactive-demo-section";
import Testimonials from "./components/testimonials-section";
import PricingPlans from "./components/pricing-section";
import FAQSection from "./components/faq-section";
import Footer from "./components/footer";

const theme = createTheme({
    palette: {
        primary: {
            main: "#2196f3",
        },
        background: {
            default: "#f5f5f5",
            paper: "#ffffff",
        },
        text: {
            primary: "#333333",
            secondary: "#666666",
        },
    },
    typography: {
        fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
        h4: {
            fontWeight: 700,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: "50px",
                    textTransform: "none",
                },
            },
        },
    },
});

export default function Home() {
    return (
        <main className={styles.main}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Header />
                <HeroSection />
                <Features />
                <InteractiveDemo />
                <Testimonials />
                <PricingPlans />
                <FAQSection />
            </ThemeProvider>
            <Footer />
        </main>
    );
}
