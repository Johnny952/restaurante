import React from "react";
import { Paper, Typography } from "@mui/material";

export default function AdminPage() {
    return (
        <Paper
            elevation={0}
            sx={{
                p: "20px",
                border: "1px solid rgba(0, 0, 0, 0.12)",
                color: "rgb(114, 119, 122)",
            }}
        >
            <Typography variant="h4" gutterBottom>
                Welcome to the Dashboard
            </Typography>
            <Typography variant="body1">
                This is your admin panel where you can manage the application.
            </Typography>
        </Paper>
    );
}
