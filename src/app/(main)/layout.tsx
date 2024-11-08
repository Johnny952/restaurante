"use client";
import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./components/theme";
import styles from "./page.module.css";
import Header from "./components/header";
import Footer from "./components/footer";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className={styles.main}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Header />
                {children}
            </ThemeProvider>
            <Footer />
        </main>
    );
}
