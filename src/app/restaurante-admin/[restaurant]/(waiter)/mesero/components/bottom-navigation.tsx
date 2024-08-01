import React, { useState } from "react";
import {
    BottomNavigation as MuiBottomNavigation,
    BottomNavigationAction,
    useMediaQuery,
    useTheme,
    Paper,
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Drawer,
} from "@mui/material";
import { Delete, Edit, Visibility, ZoomIn } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import MenuIcon from "@mui/icons-material/Menu";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import Link from "next/link";

interface BottomNavigationProps {
    showZoomControls: boolean;
    setShowZoomControls: (show: boolean) => void;
    isEditMode: boolean;
    selectedTableId: string | null;
    onDeleteTable?: () => void;
    handleAddTable?: () => void;
    handleSave?: () => void;
    handleMapDelete?: () => void;
    editHref?: string;
    viewHref?: string;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({
    showZoomControls,
    setShowZoomControls,
    isEditMode,
    selectedTableId,
    onDeleteTable = () => {},
    handleAddTable = () => {},
    handleSave = () => {},
    handleMapDelete = () => {},
    editHref = "/",
    viewHref = "/",
}) => {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
    const [openMenu, setOpenMenu] = useState(false);

    const menuItems = [
        {
            name: "Eliminar Mapa",
            onClick: handleMapDelete,
        },
        {
            name: "Editar Mapa",
            onClick: () => {},
        },
        {
            name: "Unir Mesas",
            onClick: () => {},
        },
    ];

    const menuList = (
        <Box
            sx={{ width: "100%" }}
            role="presentation"
            onClick={() => setOpenMenu(false)}
        >
            <List>
                {menuItems.map((item, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton onClick={item.onClick}>
                            <ListItemText primary={item.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Paper
            elevation={3}
            sx={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 1100,
            }}
        >
            <MuiBottomNavigation
                showLabels
                value={isEditMode ? "edit" : "view"}
                sx={{
                    height: 64,
                    "& .MuiBottomNavigationAction-root": {
                        color: theme.palette.text.secondary,
                        "&.Mui-selected": {
                            color: theme.palette.primary.main,
                        },
                    },
                }}
            >
                {isDesktop && (
                    <BottomNavigationAction
                        label="Zoom"
                        icon={<ZoomIn />}
                        onClick={() => setShowZoomControls(!showZoomControls)}
                    />
                )}
                {isEditMode &&
                    selectedTableId && [
                        <BottomNavigationAction
                            key={2}
                            label="Eliminar Mesa"
                            icon={<Delete />}
                            onClick={onDeleteTable}
                        />,
                    ]}
                {isEditMode ? (
                    [
                        <BottomNavigationAction
                            key={1}
                            label="Ver"
                            icon={<Visibility />}
                            component={Link}
                            href={viewHref}
                        />,
                        <BottomNavigationAction
                            key={2}
                            label="Agregar Mesa"
                            icon={<AddIcon />}
                            onClick={handleAddTable}
                        />,
                        <BottomNavigationAction
                            key={4}
                            label="Guardar"
                            icon={<SaveIcon />}
                            onClick={handleSave}
                        />,
                        <BottomNavigationAction
                            key={5}
                            label="Menu"
                            icon={<MenuIcon />}
                            onClick={() => setOpenMenu(true)}
                        />,
                    ]
                ) : (
                    <BottomNavigationAction
                        label="Editar"
                        icon={<Edit />}
                        component={Link}
                        href={editHref}
                    />
                )}
                {!isEditMode && selectedTableId
                    ? [
                          <BottomNavigationAction
                              key={1}
                              label="Hacer Pedido"
                              icon={<ReceiptLongIcon />}
                              onClick={() => {}}
                          />,
                          <BottomNavigationAction
                              key={2}
                              label="Terminar Pedido"
                              icon={<FactCheckIcon />}
                              onClick={() => {}}
                          />,
                      ]
                    : null}
            </MuiBottomNavigation>

            <Drawer
                open={openMenu}
                onClose={() => setOpenMenu(false)}
                anchor="bottom"
            >
                {menuList}
            </Drawer>
        </Paper>
    );
};

export default BottomNavigation;
