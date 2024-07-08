"use client"
import { Box, Grid, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { SubCategory } from "./subcategory";
import { CategoryAPI } from "@/app/api/categories/index.types";

export default function SubCategoriesDrawer({
    subcategories,
    language,
}: {
    subcategories: CategoryAPI[];
    language: string;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
                maxHeight: "60vh", // Ajusta este valor según tus necesidades
                overflowY: "auto",
                backgroundColor: "rgba(0,0,0,0.8)", // Fondo semi-transparente
                borderRadius: "15px",
                padding: "20px",
            }}
        >
            <Typography
                variant="subtitle2"
                color="white"
                sx={{ padding: "10px" }}
                textAlign="center"
            >
                Seleccione la categoría de su preferencia
            </Typography>
            <Box sx={{ paddingRight: "10px" }}>
                <Grid container spacing={2} rowSpacing={2} padding="10px" justifyContent="center">
                    {subcategories.length > 0
                        ? subcategories?.map((subcat, index) => (
                            <Grid key={index} item xs={4} sm={3} md={2} lg={1}>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <SubCategory
                                        {...subcat}
                                        link={`${language}/${subcat.link}`}
                                    />
                                </motion.div>
                            </Grid>
                        ))
                        : null}
                </Grid>
            </Box>
        </motion.div>
    )
}