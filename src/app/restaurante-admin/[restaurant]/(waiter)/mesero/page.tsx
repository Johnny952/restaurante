"use client";
import React, { useState } from "react";
import { Box, createTheme, ThemeProvider } from "@mui/material";
import TableMap from "./components/table-map";
import BottomNavigation from "./components/bottom-navigation";

const theme = createTheme({
    palette: {
        primary: {
            main: "#3f51b5",
        },
        secondary: {
            main: "#f50057",
        },
    },
});

const TablesAdminPage: React.FC = () => {
    const [mode, setMode] = useState<"view" | "edit">("view");
    const [showZoomControls, setShowZoomControls] = useState(false);

    return (
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
                <Box sx={{ flex: 1, overflow: "hidden" }}>
                    <TableMap mode={mode} showZoomControls={showZoomControls} />
                </Box>
                <BottomNavigation
                    mode={mode}
                    setMode={setMode}
                    showZoomControls={showZoomControls}
                    setShowZoomControls={setShowZoomControls}
                />
            </Box>
        </ThemeProvider>
    );
};

export default TablesAdminPage;
