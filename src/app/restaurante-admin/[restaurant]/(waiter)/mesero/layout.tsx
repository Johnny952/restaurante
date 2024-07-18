import React from "react";
import { Box, ThemeProvider } from "@mui/material";
import theme from "./components/theme";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
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
                </ThemeProvider>
            </body>
        </html>
    );
}
