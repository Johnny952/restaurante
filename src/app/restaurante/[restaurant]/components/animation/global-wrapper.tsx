"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function GlobalWrapper({ children }: { children: ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            {children}
        </motion.div>
    );
}
