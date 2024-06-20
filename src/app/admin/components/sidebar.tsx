import React from "react";
import {
    Box,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
} from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import GroupIcon from "@mui/icons-material/Group";
import Link from "next/link";
import LanguageIcon from "@mui/icons-material/Language";
import TranslateIcon from "@mui/icons-material/Translate";
import CategoryIcon from "@mui/icons-material/Category";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";

const drawerWidth = 240;

const menu = [
    {
        name: "Usuarios",
        icon: <GroupIcon />,
        link: "/admin/usuarios",
    },
    {
        name: "Restaurantes",
        icon: <RestaurantIcon />,
        link: "/admin/restaurantes",
    },
    {
        name: "Lenguajes",
        icon: <LanguageIcon />,
        link: "/admin/lenguajes",
    },
    {
        name: "Restaurantes Lenguajes",
        icon: <TranslateIcon />,
        link: "/admin/restaurantes-lenguajes",
    },
    {
        name: "Categorías",
        icon: <CategoryIcon />,
        link: "/admin/categorias",
    },
    {
        name: "Platos",
        icon: <DinnerDiningIcon />,
        link: "/admin/platos",
    },
];

const DrawerContent = () => {
    return (
        <div>
            <Toolbar>
                <Typography variant="h5" color="rgb(114, 119, 122)">
                    Admin
                </Typography>
            </Toolbar>
            <Divider sx={{ mt: "1px" }} />
            <List>
                {menu.map((option, index) => (
                    <ListItem key={index} disablePadding>
                        <Link
                            href={option.link}
                            style={{
                                color: "rgb(114, 119, 122)",
                                textDecoration: "none",
                                width: "100%",
                            }}
                        >
                            <ListItemButton>
                                <ListItemIcon>{option.icon}</ListItemIcon>
                                <ListItemText primary={option.name} />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default function Sidebar(props: {
    window?: () => Window;
    mobileOpen: boolean;
    handleDrawerTransitionEnd: () => void;
    handleDrawerClose: () => void;
}) {
    const { window, mobileOpen, handleDrawerTransitionEnd, handleDrawerClose } =
        props;

    const container =
        window !== undefined ? () => window().document.body : undefined;
    return (
        <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
        >
            <Drawer
                container={container}
                variant="temporary"
                open={mobileOpen}
                onTransitionEnd={handleDrawerTransitionEnd}
                onClose={handleDrawerClose}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: { xs: "block", sm: "none" },
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: drawerWidth,
                    },
                }}
            >
                <DrawerContent />
            </Drawer>
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: "none", sm: "block" },
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: drawerWidth,
                    },
                }}
                open
            >
                <DrawerContent />
            </Drawer>
        </Box>
    );
}
