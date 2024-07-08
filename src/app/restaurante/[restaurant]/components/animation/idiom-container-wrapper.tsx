"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function IdiomContainerWrapper({ children }: { children: ReactNode }) {
    return (
        <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
        >
            {children}
        </motion.div>
    );
}