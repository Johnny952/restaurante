"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode, useState, useEffect } from "react";
import Loader from "./page-loader";

interface PageTransitionProps {
    children: ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
    const pathname = usePathname();
    const [isLoading, setIsLoading] = useState(false);
    const [previousPathname, setPreviousPathname] = useState("");
    const [direction, setDirection] = useState("forward");

    useEffect(() => {
        const handleStart = () => setIsLoading(true);
        const handleComplete = () => setIsLoading(false);

        window.addEventListener("beforeunload", handleStart);
        window.addEventListener("load", handleComplete);

        return () => {
            window.removeEventListener("beforeunload", handleStart);
            window.removeEventListener("load", handleComplete);
        };
    }, []);

    useEffect(() => {
        if (previousPathname) {
            // Compara la longitud de las rutas para determinar la dirección
            if (pathname.length > previousPathname.length) {
                setDirection("forward");
            } else if (pathname.length < previousPathname.length) {
                setDirection("backward");
            } else {
                // Si las longitudes son iguales, compara las rutas
                setDirection(
                    pathname > previousPathname ? "forward" : "backward"
                );
            }
        }
        setPreviousPathname(pathname);
    }, [pathname]);

    const variants = {
        initial: (direction: string) => ({
            x: direction === "forward" ? "100%" : "-100%",
            opacity: 0,
        }),
        animate: {
            x: 0,
            opacity: 1,
        },
        exit: (direction: string) => ({
            x: direction === "forward" ? "-100%" : "100%",
            opacity: 0,
        }),
    };

    return (
        <AnimatePresence mode="wait" custom={direction}>
            {isLoading ? (
                <motion.div
                    key="loader"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <Loader />
                </motion.div>
            ) : (
                <motion.div
                    key={pathname}
                    custom={direction}
                    variants={variants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default PageTransition;
