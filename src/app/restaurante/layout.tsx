import React from "react";
import { Box, ThemeProvider } from "@mui/material";
import theme from "./components/theme";
import PageTransition from "./components/page-transition";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ThemeProvider theme={theme}>
            <Box>
                <PageTransition>{children}</PageTransition>
            </Box>
        </ThemeProvider>
    );
}
