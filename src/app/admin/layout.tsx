"use client";
import Header from "./components/header";
import Sidebar from "@/app/admin/components/sidebar";
import useLoadStore from "@/store/load-store";
import useSnackStore from "@/store/snackbar-store";
import {
    Alert,
    Backdrop,
    Box,
    CircularProgress,
    CssBaseline,
    Snackbar,
} from "@mui/material";
import React, { useState } from "react";

export default function DashboardLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode;
}) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

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
        <Box sx={{ display: "flex", color: "rgb(114, 119, 122)" }}>
            <CssBaseline />
            <Header handleDrawerToggle={handleDrawerToggle} />
            <Sidebar
                mobileOpen={mobileOpen}
                handleDrawerTransitionEnd={handleDrawerTransitionEnd}
                handleDrawerClose={handleDrawerClose}
            />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    backgroundColor: "rgb(249, 250, 251)",
                    minHeight: "100vh",
                    pt: "90px",
                }}
            >
                {children}
            </Box>

            <Backdrop sx={{ color: "#fff", zIndex: 999999 }} open={loading}>
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
        </Box>
    );
}
