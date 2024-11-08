"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function ContainerWrapper({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={{
                visible: {
                    transition: {
                        staggerChildren: 0.1,
                    },
                },
            }}
        >
            {children}
        </motion.div>
    );
}
