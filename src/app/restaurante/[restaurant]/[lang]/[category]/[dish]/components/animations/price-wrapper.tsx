"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function PriceWrapper({ children }: { children: ReactNode }) {
    return (
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
            {children}
        </motion.div>
    );
}
