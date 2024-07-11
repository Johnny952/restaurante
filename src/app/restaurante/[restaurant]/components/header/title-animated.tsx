"use client";
import { Typography } from "@mui/material";
import { motion } from "framer-motion";

export default function TitleAnimated({ title, isMobile }: { title: string; isMobile: boolean }) {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={{
                visible: { transition: { staggerChildren: 0.1 } },
            }}
        >
            <Typography variant={isMobile ? "h6" : "h5"} sx={{ fontWeight: isMobile ? 500 : 400 }}>
                {title.split("").map((char, index) => (
                    <motion.span
                        key={index}
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 },
                        }}
                    >
                        {char}
                    </motion.span>
                ))}
            </Typography>
        </motion.div>
    );
}