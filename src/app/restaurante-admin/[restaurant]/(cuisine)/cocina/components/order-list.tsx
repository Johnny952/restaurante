import React, { useState } from "react";
import { Grid, Box, IconButton } from "@mui/material";
import { Order } from "../types/order.d";
import { NotePaper } from "./note-paper";
import { OrderCard } from "./order-card";
import { OrderNoteModal } from "./order-note-modal";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

interface OrderListProps {
    orders: Order[];
    onMovePriority: (orderId: string, direction: "up" | "down") => void;
}

export const OrderList: React.FC<OrderListProps> = ({
    orders,
    onMovePriority,
}) => {
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const renderPriorityButtons = (orderId: string) => (
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
            <IconButton
                onClick={() => onMovePriority(orderId, "up")}
                size="small"
            >
                <ArrowUpwardIcon />
            </IconButton>
            <IconButton
                onClick={() => onMovePriority(orderId, "down")}
                size="small"
            >
                <ArrowDownwardIcon />
            </IconButton>
        </Box>
    );

    return (
        <>
            <Grid container spacing={3} sx={{ py: "30px" }}>
                {orders.map((order) => (
                    <Grid item xs={12} sm={6} md={4} key={order.id}>
                        <NotePaper>
                            <OrderCard
                                order={order}
                                onViewNotes={() => setSelectedOrder(order)}
                            />
                            {renderPriorityButtons(order.id)}
                        </NotePaper>
                    </Grid>
                ))}
            </Grid>
            <OrderNoteModal
                order={selectedOrder}
                onClose={() => setSelectedOrder(null)}
            />
        </>
    );
};
