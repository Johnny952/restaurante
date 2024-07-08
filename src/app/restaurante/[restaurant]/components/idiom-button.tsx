"use client";
import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";

export default function IdiomButton({
    name,
    link,
    key,
}: {
    name: string;
    link: string;
    key: number;
}) {
    return (
        <motion.div
            key={key}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * key }}
        >
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <ListItem disablePadding>
                    <div style={{ textAlign: "center", width: "100%" }}>
                        <Link
                            href={link}
                            style={{
                                color: "white",
                                colorScheme: "dark",
                                textDecoration: "none",
                            }}
                        >
                            <ListItemButton>
                                <ListItemText
                                    primary={name}
                                    sx={{ textAlign: "center" }}
                                    primaryTypographyProps={{
                                        fontSize: 20,
                                        fontWeight: "medium",
                                        letterSpacing: 0,
                                    }}
                                />
                            </ListItemButton>
                        </Link>
                    </div>
                </ListItem>
            </motion.div>
        </motion.div>
    );
}
