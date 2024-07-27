"use client";
import React, { useState } from "react";
import {
    Box,
    Drawer,
    IconButton,
    Typography,
    useMediaQuery,
    useTheme,
    Grid,
    Button,
    Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Table from "../table";

interface AddTableDrawerProps {
    open: boolean;
    handleClose: () => void;
    handleConfirm: (id: string) => void;
}

export default function AddTableDrawer({
    open,
    handleClose,
    handleConfirm,
}: AddTableDrawerProps) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [selectedTable, setSelectedTable] = useState<string | null>(null);

    const handleTableSelect = (id: string) => {
        setSelectedTable(id);
    };

    return (
        <Drawer
            anchor={isMobile ? "bottom" : "right"}
            open={open}
            onClose={handleClose}
            PaperProps={{
                sx: {
                    width: isMobile ? "100%" : "400px",
                    height: isMobile ? "calc(100% - 56px)" : "100%",
                    maxHeight: "100%",
                    borderTopLeftRadius: isMobile ? "16px" : 0,
                    borderTopRightRadius: isMobile ? "16px" : 0,
                    backgroundColor: theme.palette.background.paper,
                    display: "flex",
                    flexDirection: "column",
                },
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 2,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                }}
            >
                <Typography variant="h6">Seleccionar mesa</Typography>
                <IconButton onClick={handleClose} size="small">
                    <CloseIcon />
                </IconButton>
            </Box>

            <Box
                sx={{
                    flexGrow: 1,
                    overflowY: "auto",
                    p: 2,
                }}
            >
                <Grid container spacing={2}>
                    {["1", "2", "3"].map((id, index) => (
                        <Grid item xs={6} sm={4} key={index}>
                            <Box
                                sx={{
                                    aspectRatio: "350/600",
                                    width: "100%",
                                    height: "200px",
                                }}
                            >
                                <Paper
                                    elevation={3}
                                    sx={{
                                        width: "100%",
                                        height: "100%",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        cursor: "pointer",
                                        transition: "all 0.3s ease",
                                        border:
                                            selectedTable === id
                                                ? `2px solid ${theme.palette.primary.main}`
                                                : "none",
                                        boxShadow:
                                            selectedTable === id
                                                ? `0 0 10px ${theme.palette.primary.main}`
                                                : "none",
                                        "&:hover": {
                                            backgroundColor: "action.hover",
                                            transform: "scale(1.05)",
                                        },
                                    }}
                                    onClick={() => handleTableSelect(id)}
                                >
                                    <Table
                                        typeId={id}
                                        id={index.toString()}
                                        x={0}
                                        y={0}
                                        isEditable={false}
                                        isDragging={false}
                                        isSelected={false}
                                        isInDrawer={true}
                                    />
                                </Paper>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    p: 2,
                    borderTop: `1px solid ${theme.palette.divider}`,
                }}
            >
                <Button
                    variant="contained"
                    disabled={!selectedTable}
                    onClick={() => handleConfirm(selectedTable || "")}
                >
                    Confirmar
                </Button>
            </Box>
        </Drawer>
    );
}
