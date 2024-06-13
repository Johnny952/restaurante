"use client";
import { Typography } from "@mui/material";
import { motion } from "framer-motion";

export default function TitleAnimated({ title }: { title: string }) {
    return (
        <motion.div
            animate={{ y: [-25, 0], opacity: [0, 1] }}
            transition={{ duration: 0.8 }}
        >
            <Typography variant="h5">{title}</Typography>
        </motion.div>
    );
}
