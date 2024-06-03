'use client'
import { ListItem, ListItemButton, ListItemText } from "@mui/material"
import { motion } from "framer-motion"
import Link from "next/link"

export default function IdiomButton({ name, link }: { name: string, link: string }) {
    return (
        <motion.div animate={{ scale: [0, 1] }} transition={{ duration: 0.8 }}>
            <ListItem disablePadding>
                <div style={{ textAlign: 'center', width: '100%' }}>
                    <Link href={link} style={{ color: 'white', colorScheme: 'dark', textDecoration: 'none' }}>
                        <ListItemButton>
                            <ListItemText primary={name} sx={{ textAlign: 'center' }} primaryTypographyProps={{
                                fontSize: 20,
                                fontWeight: 'medium',
                                letterSpacing: 0,
                            }} />
                        </ListItemButton>
                    </Link>
                </div>
            </ListItem>
        </motion.div>
    )
}