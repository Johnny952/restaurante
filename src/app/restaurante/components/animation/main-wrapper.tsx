"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function MainWrapper({ children }: { children: ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {children}
        </motion.div>
    );
}
