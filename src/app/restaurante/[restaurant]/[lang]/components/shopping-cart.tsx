import React from "react";
import {
    Drawer,
    List,
    ListItem,
    IconButton,
    Typography,
    Box,
    useTheme,
    useMediaQuery,
    ThemeProvider,
    createTheme,
    Paper,
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
import { motion } from "framer-motion";

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
    typography: {
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        h6: {
            fontWeight: 600,
        },
        subtitle1: {
            fontWeight: 500,
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
        <Box
            sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 2,
                    borderBottom: 1,
                    borderColor: "divider",
                }}
            >
                <Typography variant="h5" fontWeight="bold">
                    Favoritos
                </Typography>
                <IconButton onClick={onClose} sx={{ color: "primary.main" }}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <List sx={{ flexGrow: 1, overflowY: "auto", width: "100%", p: 0 }}>
                {dishes.map((dish) => (
                    <motion.div
                        key={dish.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Paper
                            elevation={3}
                            sx={{ m: 2, borderRadius: 2, overflow: "hidden" }}
                        >
                            <ListItem
                                sx={{
                                    flexDirection: "column",
                                    alignItems: "stretch",
                                    p: 2,
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        mb: 2,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            flexShrink: 0,
                                            mr: 2,
                                            width: 60,
                                            height: 60,
                                        }}
                                    >
                                        <Image
                                            src={dish.image}
                                            alt={dish.name}
                                            width={60}
                                            height={60}
                                            objectFit="cover"
                                            style={{ borderRadius: "8px" }}
                                        />
                                    </Box>
                                    <Box
                                        sx={{
                                            flexGrow: 1,
                                            minWidth: 0,
                                            width: "calc(100% - 76px)",
                                        }}
                                    >
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
                                                        textDecoration:
                                                            "underline",
                                                    },
                                                    display: "block",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    whiteSpace: "nowrap",
                                                    maxWidth: "100%",
                                                }}
                                            >
                                                {dish.name}
                                            </Typography>
                                        </Link>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                whiteSpace: "nowrap",
                                            }}
                                        >
                                            Precio: {formatPrice(dish.price)}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        flexWrap: "wrap",
                                    }}
                                >
                                    <Typography
                                        variant="body1"
                                        fontWeight="medium"
                                        sx={{
                                            mb: 1,
                                            width: "100%",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        Subtotal:{" "}
                                        {formatPrice(
                                            dish.price * dish.quantity
                                        )}
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            width: "100%",
                                        }}
                                    >
                                        <Box>
                                            <IconButton
                                                onClick={() =>
                                                    subProduct(dish.id)
                                                }
                                                size="small"
                                                sx={{ color: "primary.main" }}
                                            >
                                                <RemoveIcon />
                                            </IconButton>
                                            <Typography
                                                component="span"
                                                sx={{
                                                    mx: 1,
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                {dish.quantity}
                                            </Typography>
                                            <IconButton
                                                onClick={() =>
                                                    addOneProduct(dish.id)
                                                }
                                                size="small"
                                                sx={{ color: "primary.main" }}
                                            >
                                                <AddIcon />
                                            </IconButton>
                                        </Box>
                                        <IconButton
                                            onClick={() =>
                                                removeProduct(dish.id)
                                            }
                                            size="small"
                                            sx={{ color: "error.main" }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                </Box>
                            </ListItem>
                        </Paper>
                    </motion.div>
                ))}
            </List>
            <Box sx={{ p: 2, borderTop: 1, borderColor: "divider" }}>
                <Typography variant="h5" fontWeight="bold" align="right">
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
                        width: isMobile ? "100%" : "450px",
                    },
                }}
            >
                {cartContent}
            </Drawer>
        </ThemeProvider>
    );
};

export default ShoppingCart;
