"use client";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import toTitle from "@/helpers/to-title";
import Link from "next/link";
import { CategoryAPI } from "@/app/api/categories/index.types";
import { ImageAsync } from "@/components/image-async";
import { motion } from "framer-motion";

export function SubCategory({
    name,
    image,
    link,
}: CategoryAPI & { link: string }) {
    return (
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Card
                elevation={3}
                sx={{
                    backgroundColor: "rgba(0,0,0,0.7)",
                    borderRadius: "15px",
                }}
            >
                <Link href={link}>
                    <CardActionArea>
                        <div
                            style={{
                                borderRadius: "15%",
                                border: "2px solid #9c27b0",
                                overflow: "hidden",
                                margin: "10px",
                            }}
                        >
                            <ImageAsync
                                alt="subcategoria"
                                src={image}
                                sizes="100vw"
                                width={100}
                                height={100}
                                priority={true}
                                style={{
                                    width: "100%",
                                    height: "auto",
                                    borderRadius: "15%",
                                    transition: "transform 0.3s ease-in-out",
                                }}
                            />
                        </div>
                        <CardContent>
                            <Typography
                                variant="subtitle2"
                                color="white"
                                textAlign="center"
                                sx={{
                                    fontWeight: 600,
                                    letterSpacing: 0.5,
                                    textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
                                }}
                            >
                                {toTitle(name)}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Link>
            </Card>
        </motion.div>
    );
}
