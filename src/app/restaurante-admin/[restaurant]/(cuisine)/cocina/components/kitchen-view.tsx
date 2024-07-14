"use client";
import React, { useState } from "react";
import "@egjs/react-flicking/dist/flicking.css";
import { AppBar, Box, IconButton, Pagination, Tab, Tabs } from "@mui/material";
import { OrderList } from "./order-list";
import { orders } from "../constants/orders";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

export const KitchenView: React.FC = () => {
    const [tabValue, setTabValue] = useState(0);
    const [page, setPage] = useState(1);
    const ordersPerPage = 2;

    const newOrders = orders.filter((order) => order.status === "new");
    const preparingOrders = orders.filter(
        (order) => order.status === "preparing"
    );
    const readyOrders = orders.filter((order) => order.status === "ready");

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
        setPage(1);
    };

    const handlePageChange = (
        event: React.ChangeEvent<unknown>,
        value: number
    ) => {
        setPage(value);
    };

    const getCurrentOrders = () => {
        switch (tabValue) {
            case 0:
                return newOrders;
            case 1:
                return preparingOrders;
            case 2:
                return readyOrders;
            default:
                return [];
        }
    };

    const currentOrders = getCurrentOrders();
    const pageCount = Math.ceil(currentOrders.length / ordersPerPage);
    const displayedOrders = currentOrders.slice(
        (page - 1) * ordersPerPage,
        page * ordersPerPage
    );

    const movePriority = (orderId: string, direction: "up" | "down") => {
        // Implementar la lógica para mover la prioridad del pedido
        console.log(`Mover pedido ${orderId} ${direction}`);
    };

    return (
        <Box>
            <AppBar position="sticky" color="default">
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    variant="fullWidth"
                >
                    <Tab label={`Nuevos (${newOrders.length})`} />
                    <Tab label={`En Preparación (${preparingOrders.length})`} />
                    <Tab label={`Listos (${readyOrders.length})`} />
                </Tabs>
            </AppBar>
            <OrderList orders={displayedOrders} onMovePriority={movePriority} />
            {pageCount > 1 && (
                <Pagination
                    count={pageCount}
                    page={page}
                    onChange={handlePageChange}
                    sx={{
                        marginTop: 2,
                        display: "flex",
                        justifyContent: "center",
                    }}
                />
            )}
        </Box>
    );
};
