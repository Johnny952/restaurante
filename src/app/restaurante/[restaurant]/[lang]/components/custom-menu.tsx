// CustomMenu.tsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box } from "@mui/material";

interface CustomMenuProps {
    open: boolean;
    children: React.ReactNode;
}

const CustomMenu: React.FC<CustomMenuProps> = ({ open, children }) => {
    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.2 }}
                    style={{
                        position: "absolute",
                        bottom: "100%",
                        right: 0,
                        marginBottom: "10px",
                        width: "200px",
                        overflow: "hidden",
                    }}
                >
                    <Box
                        sx={{
                            py: 1,
                            backgroundColor: "rgba(255, 255, 255, 0)",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end",
                        }}
                    >
                        {children}
                    </Box>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CustomMenu;
