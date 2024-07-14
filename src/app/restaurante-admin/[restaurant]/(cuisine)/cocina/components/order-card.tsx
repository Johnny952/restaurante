import React from "react";
import { Typography, Button, Box, Chip } from "@mui/material";
import NoteIcon from "@mui/icons-material/Note";
import { Order } from "../types/order.d";
import { OrderTimer } from "./order-time";

interface OrderCardProps {
    order: Order;
    onViewNotes: () => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order, onViewNotes }) => {
    const hasNotes = order.items.some((item) => item.notes);

    const getStatusColor = (status: string) => {
        switch (status) {
            case "new":
                return "primary";
            case "preparing":
                return "secondary";
            case "ready":
                return "success";
            default:
                return "default";
        }
    };

    return (
        <Box>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
            >
                <Typography variant="h6" color="primary">
                    {`Pedido #${order.id}`}
                </Typography>
                <Chip
                    label={order.status.toUpperCase()}
                    color={getStatusColor(order.status)}
                    size="small"
                />
            </Box>
            <Typography
                color="text.secondary"
                mb={1}
            >{`Mesa ${order.table}`}</Typography>
            <Box sx={{ my: 2 }}>
                {order.items.map((item, index) => (
                    <Typography key={index} color="text.primary">
                        {`${item.quantity}x ${item.name}`}
                    </Typography>
                ))}
            </Box>
            <OrderTimer startTime={order.timestamp} />
            <Box mt={2}>
                {order.status === "new" && (
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mb: 1 }}
                    >
                        Aceptar Pedido
                    </Button>
                )}
                {order.status === "preparing" && (
                    <Button
                        variant="contained"
                        color="secondary"
                        fullWidth
                        sx={{ mb: 1 }}
                    >
                        Completar Pedido
                    </Button>
                )}
                {order.status === "ready" && (
                    <Button
                        variant="contained"
                        color="success"
                        fullWidth
                        sx={{ mb: 1 }}
                    >
                        Entregar Pedido
                    </Button>
                )}
                {hasNotes && (
                    <Button
                        variant="outlined"
                        color="primary"
                        fullWidth
                        startIcon={<NoteIcon />}
                        onClick={onViewNotes}
                    >
                        Ver Notas
                    </Button>
                )}
            </Box>
        </Box>
    );
};
