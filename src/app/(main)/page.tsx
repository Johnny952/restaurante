"use client";
import HeroSection from "./components/hero-section";
import Features from "./components/features-section";
import InteractiveDemo from "./components/interactive-demo-section";
import Testimonials from "./components/testimonials-section";
import PricingPlans from "./components/pricing-section";
import FAQSection from "./components/faq-section";

export default function Home() {
    return (
        <>
            <HeroSection />
            <Features />
            <InteractiveDemo />
            <Testimonials />
            <PricingPlans />
            <FAQSection />
        </>
    );
}
