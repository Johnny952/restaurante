"use client";
import React, { useState } from "react";
import {
    useMediaQuery,
    useTheme,
    Box,
    Paper,
    IconButton,
    Badge,
    Typography,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    ListItemIcon,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRouter, usePathname } from "next/navigation";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LanguageIcon from "@mui/icons-material/Language";
import MenuIcon from "@mui/icons-material/Menu";
import FeedbackIcon from "@mui/icons-material/Feedback";
import { grey, purple } from "@mui/material/colors";
import MenuButton from "./menu-button";
import BackButton from "./back-button";
import useFavStore from "@/store/fav-store";
import CategoryIcon from "@mui/icons-material/Category";
import FeedbackDrawer from "./feedback";
import ShoppingCart from "./shopping-cart";

const NavBar = styled(Paper)(({ theme }) => ({
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    height: 70,
    backgroundColor: purple[50],
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "visible",
    zIndex: 1000,
}));

const NavButton = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: purple[700],
    "&.active": {
        color: purple[900],
    },
}));

const CenterButton = styled(IconButton)(({ theme }) => ({
    backgroundColor: purple[500],
    color: theme.palette.common.white,
    "&:hover": {
        backgroundColor: purple[700],
    },
    width: 70,
    height: 70,
    position: "absolute",
    bottom: 0, // Ajustado para que se posicione correctamente sobre el NavBar
    left: "50%",
    transform: "translateX(-50%)",
    borderRadius: "50%",
    boxShadow: theme.shadows[4],
    zIndex: 1001,
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
        right: -3,
        top: 3,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: "0 4px",
    },
}));

const ResponsiveNavigation = ({
    disableBack = false,
    disableCategories = false,
    disableLanguage = false,
    emptyCart = false,
}: {
    disableBack?: boolean;
    disableCategories?: boolean;
    disableLanguage?: boolean;
    emptyCart?: boolean;
}) => {
    const theme = useTheme();
    const pathname = usePathname();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const router = useRouter();
    const [menuDrawerOpen, setMenuDrawerOpen] = useState(false);
    const [openFeed, setOpenFeed] = React.useState(false);
    const [openCart, setOpenCart] = React.useState(false);

    const productCount = useFavStore((state) =>
        Object.values(state.products).reduce(
            (sum, product) => sum + product.quantity,
            0
        )
    );
    const clearProducts = useFavStore((state) => state.clear);

    const handleListDrawerToggle = () => {
        if (!disableCategories) {
            router.push(pathname?.split("/").slice(0, 4).join("/") || "/");
        }
    };

    const handleMenuDrawerToggle = () => {
        setMenuDrawerOpen(!menuDrawerOpen);
    };

    const handleLanguageToggle = () => {
        if (!disableLanguage) {
            clearProducts();
            router.push(pathname?.split("/").slice(0, 3).join("/") || "/");
        }
    };

    const btnColor = (disabled: boolean) =>
        disabled ? grey[400] : purple[700];

    const mobileNavigation = (
        <>
            <NavBar elevation={3}>
                <NavButton
                    onClick={() => (!disableBack ? router.back() : null)}
                >
                    <IconButton disabled={disableBack}>
                        <ArrowBackIosNewIcon
                            sx={{ color: btnColor(disableBack) }}
                        />
                    </IconButton>
                    <Typography
                        variant="caption"
                        sx={{ color: btnColor(disableBack) }}
                    >
                        Atrás
                    </Typography>
                </NavButton>
                <NavButton onClick={handleListDrawerToggle}>
                    <IconButton disabled={disableCategories}>
                        <CategoryIcon
                            sx={{ color: btnColor(disableCategories) }}
                        />
                    </IconButton>
                    <Typography
                        variant="caption"
                        sx={{ color: btnColor(disableCategories) }}
                    >
                        Categorías
                    </Typography>
                </NavButton>
                <Box width={60} />
                <NavButton onClick={handleLanguageToggle}>
                    <IconButton disabled={disableLanguage}>
                        <LanguageIcon
                            sx={{ color: btnColor(disableLanguage) }}
                        />
                    </IconButton>
                    <Typography
                        variant="caption"
                        sx={{ color: btnColor(disableLanguage) }}
                    >
                        Lenguajes
                    </Typography>
                </NavButton>
                <NavButton onClick={handleMenuDrawerToggle}>
                    <IconButton>
                        <MenuIcon sx={{ color: purple[700] }} />
                    </IconButton>
                    <Typography variant="caption">Menu</Typography>
                </NavButton>
                <CenterButton onClick={() => setOpenCart(true)}>
                    <StyledBadge badgeContent={productCount} color="secondary">
                        <ShoppingCartIcon />
                    </StyledBadge>
                </CenterButton>
            </NavBar>

            <Drawer
                anchor="bottom"
                open={menuDrawerOpen}
                onClose={handleMenuDrawerToggle}
            >
                <Box
                    sx={{ width: "100%", backgroundColor: purple[50] }}
                    role="presentation"
                    onClick={handleMenuDrawerToggle}
                >
                    <Typography variant="h6" sx={{ p: 2 }}>
                        Menu
                    </Typography>
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => setOpenFeed(true)}>
                                <ListItemIcon>
                                    <FeedbackIcon sx={{ color: purple[700] }} />
                                </ListItemIcon>
                                <ListItemText primary="Feedback" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </>
    );

    const desktopNavigation = (
        <>
            <MenuButton
                setOpenFeed={setOpenFeed}
                setOpenCart={setOpenCart}
                handleLanguageToggle={handleLanguageToggle}
                handleListDrawerToggle={handleListDrawerToggle}
                disableCategories={disableCategories}
                disableLanguage={disableLanguage}
            />
            <BackButton disabled={disableBack} />
        </>
    );

    return (
        <Box sx={{ pb: 9 }}>
            {isMobile ? mobileNavigation : desktopNavigation}
            <FeedbackDrawer
                open={openFeed}
                onClose={() => setOpenFeed(false)}
            />
            <ShoppingCart
                open={openCart}
                onClose={() => setOpenCart(false)}
                emptyCart={emptyCart}
            />
        </Box>
    );
};

export default ResponsiveNavigation;
