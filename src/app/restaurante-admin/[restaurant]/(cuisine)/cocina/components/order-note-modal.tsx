import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    List,
    ListItem,
    Fade,
} from "@mui/material";
import { Order } from "../types/order.d";

interface OrderNoteModalProps {
    order: Order | null;
    onClose: () => void;
}

export const OrderNoteModal: React.FC<OrderNoteModalProps> = ({
    order,
    onClose,
}) => {
    if (!order) return null;

    return (
        <Dialog
            open={!!order}
            onClose={onClose}
            TransitionComponent={Fade}
            transitionDuration={300}
        >
            <DialogTitle>{`Notas para el Pedido #${order.id}`}</DialogTitle>
            <DialogContent>
                <List>
                    {order.items
                        .filter((item) => item.notes)
                        .map((item, index) => (
                            <ListItem key={index}>
                                <Typography>
                                    <strong>{item.name}:</strong> {item.notes}
                                </Typography>
                            </ListItem>
                        ))}
                </List>
            </DialogContent>
        </Dialog>
    );
};
