"use client";
import { ImageList, styled } from "@mui/material";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React from "react";

const NewImageList = styled(ImageList)(({ theme }) => ({
    transition: "all 0.3s ease-in-out",
    "&:hover": {
        cursor: "pointer",
        opacity: 0.8,
        transform: "scale(1.02)",
    },
}));

export default function ImageListWithStyle(props: {
    children: NonNullable<React.ReactNode>;
    link: string;
}) {
    const { children, link } = props;
    const router = useRouter();

    function onClick() {
        router.push(link);
    }

    return (
        <div>
            <NewImageList cols={1} variant="standard" onClick={onClick}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {children}
                </motion.div>
            </NewImageList>
        </div>
    );
}
