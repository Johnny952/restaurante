"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function ImageWrapper({ children }: { children: ReactNode }) {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
                borderRadius: "15px",
                border: "3px solid #9c27b0",
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(156, 39, 176, 0.3)",
            }}
        >
            {children}
        </motion.div>
    );
}
