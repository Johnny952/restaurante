"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function CategoryWrapper({ children }: { children: ReactNode }) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
            }}
        >
            {children}
        </motion.div>
    );
}