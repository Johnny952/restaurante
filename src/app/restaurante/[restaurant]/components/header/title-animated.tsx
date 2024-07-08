"use client";
import { Typography } from "@mui/material";
import { motion } from "framer-motion";

export default function TitleAnimated({ title }: { title: string }) {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={{
                visible: { transition: { staggerChildren: 0.1 } },
            }}
        >
            <Typography variant="h5">{
                title.split("").map((char, index) => (
                    <motion.span
                        key={index}
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 },
                        }}
                    >
                        {char}
                    </motion.span>
                ))
            }</Typography>
        </motion.div>
    );
}
