"use client";
import React from "react";
import {
    Alert,
    Backdrop,
    Box,
    CircularProgress,
    Snackbar,
    ThemeProvider,
} from "@mui/material";
import theme from "./components/theme";
import useLoadStore from "@/store/load-store";
import useSnackStore from "@/store/snackbar-store";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const loading = useLoadStore((state) => state.loading);
    const snackbarOpen = useSnackStore((state) => state.open);
    const closeSnackbar = useSnackStore((state) => state.close);
    const snackbarSeverity = useSnackStore((state) => state.severity);
    const snackbarText = useSnackStore((state) => state.text);
    const handleCloseSnackbar = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }
        closeSnackbar();
    };
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
                    <Snackbar
                        open={snackbarOpen}
                        autoHideDuration={6000}
                        onClose={handleCloseSnackbar}
                    >
                        <Alert
                            onClose={handleCloseSnackbar}
                            severity={snackbarSeverity}
                            variant="filled"
                            sx={{ width: "100%" }}
                        >
                            {snackbarText}
                        </Alert>
                    </Snackbar>
                </ThemeProvider>
            </body>
        </html>
    );
}
