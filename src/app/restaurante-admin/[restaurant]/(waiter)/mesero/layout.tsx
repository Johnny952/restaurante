"use client";
import React from "react";
import { Backdrop, Box, CircularProgress, ThemeProvider } from "@mui/material";
import theme from "./components/theme";
import useLoadStore from "@/store/load-store";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const loading = useLoadStore((state) => state.loading);
    return (
        <html lang="es">
            <body>
                <ThemeProvider theme={theme}>
                    <Box
                        sx={{
                            height: "100vh",
                            width: "100vw",
                            display: "flex",
                            flexDirection: "column",
                            overflow: "hidden",
                        }}
                    >
                        {children}
                    </Box>
                    <Backdrop
                        sx={{ color: "#fff", zIndex: 999999 }}
                        open={loading}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </ThemeProvider>
            </body>
        </html>
    );
}
