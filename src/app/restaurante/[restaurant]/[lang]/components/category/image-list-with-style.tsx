"use client";
import { Box, Drawer, ImageList, styled } from "@mui/material";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React, { ReactElement } from "react";

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
    drawer: ReactElement;
    hasSubcategories: boolean;
    link: string;
}) {
    const { children, drawer, hasSubcategories, link } = props;
    const [open, setOpen] = React.useState(false);
    const router = useRouter();

    function onClick() {
        if (hasSubcategories) {
            setOpen(true);
        } else {
            router.push(link);
        }
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
            <Drawer
                anchor="bottom"
                open={open}
                onClose={() => setOpen(false)}
                PaperProps={{
                    sx: {
                        borderTopLeftRadius: "20px",
                        borderTopRightRadius: "20px",
                        backgroundColor: "transparent",
                        boxShadow: "none",
                        maxHeight: "70vh", // Ajusta según sea necesario
                    },
                }}
            >
                <Box
                    sx={{
                        width: "auto",
                        background:
                            "linear-gradient(to bottom, #000000, #1a1a1a)",
                        padding: "20px 0",
                    }}
                    role="presentation"
                    onClick={() => setOpen(false)}
                    onKeyDown={() => setOpen(false)}
                >
                    {drawer}
                </Box>
            </Drawer>
        </div>
    );
}
