import React, { useState } from "react";
import {
    Drawer,
    List,
    ListItem,
    IconButton,
    Typography,
    Divider,
    Box,
    useTheme,
    useMediaQuery,
    Grid,
    ThemeProvider,
    createTheme,
} from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { purple } from "@mui/material/colors";
import useFavStore from "@/store/fav-store";
import formatPrice from "@/helpers/format-price";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: purple[300],
        },
        background: {
            default: "#121212",
            paper: "#1E1E1E",
        },
    },
});

const ShoppingCart = ({
    open,
    onClose,
}: {
    open: boolean;
    onClose: () => void;
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const { products, addOneProduct, subProduct, removeProduct } =
        useFavStore();

    const dishes = Object.values(products);
    const totalCost = dishes.reduce(
        (sum, dish) => sum + dish.price * dish.quantity,
        0
    );

    const cartContent = (
        <Box sx={{ width: isMobile ? "100vw" : "350px", padding: 2 }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                }}
            >
                <Typography variant="h6">Favoritos</Typography>
                <IconButton onClick={() => onClose()}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <List>
                {dishes.map((dish) => (
                    <React.Fragment key={dish.id}>
                        <ListItem
                            sx={{
                                flexDirection: "column",
                                alignItems: "stretch",
                            }}
                        >
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={3}>
                                    <Image
                                        src={dish.image}
                                        alt={dish.name}
                                        width={60}
                                        height={60}
                                        objectFit="cover"
                                        style={{ borderRadius: "8px" }}
                                    />
                                </Grid>
                                <Grid item xs={9}>
                                    <Link
                                        href={`/restaurante/${dish.restaurant}/${dish.language}/${dish.category}/${dish.link}`}
                                        passHref
                                    >
                                        <Typography
                                            component="a"
                                            variant="subtitle1"
                                            sx={{
                                                color: "primary.main",
                                                textDecoration: "none",
                                                "&:hover": {
                                                    textDecoration: "underline",
                                                },
                                            }}
                                        >
                                            {dish.name}
                                        </Typography>
                                    </Link>
                                    <Typography variant="body2">
                                        Precio: {formatPrice(dish.price)}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    mt: 1,
                                }}
                            >
                                <Typography variant="body2">
                                    Subtotal:{" "}
                                    {formatPrice(dish.price * dish.quantity)}
                                </Typography>
                                <Box>
                                    <IconButton
                                        aria-label="remove"
                                        onClick={() => subProduct(dish.id)}
                                        size="small"
                                    >
                                        <RemoveIcon />
                                    </IconButton>
                                    <Typography component="span" sx={{ mx: 1 }}>
                                        {dish.quantity}
                                    </Typography>
                                    <IconButton
                                        aria-label="add"
                                        onClick={() => addOneProduct(dish.id)}
                                        size="small"
                                    >
                                        <AddIcon />
                                    </IconButton>
                                    <IconButton
                                        aria-label="delete"
                                        onClick={() => removeProduct(dish.id)}
                                        size="small"
                                        sx={{ ml: 1 }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                        </ListItem>
                        <Divider />
                    </React.Fragment>
                ))}
            </List>
            <Box sx={{ mt: 2, textAlign: "right" }}>
                <Typography variant="h6">
                    Total: {formatPrice(totalCost)}
                </Typography>
            </Box>
        </Box>
    );

    return (
        <ThemeProvider theme={darkTheme}>
            <Drawer
                anchor="left"
                open={open}
                onClose={onClose}
                PaperProps={{
                    sx: {
                        backgroundColor: "background.paper",
                        color: "text.primary",
                    },
                }}
            >
                {cartContent}
            </Drawer>
        </ThemeProvider>
    );
};

export default ShoppingCart;
