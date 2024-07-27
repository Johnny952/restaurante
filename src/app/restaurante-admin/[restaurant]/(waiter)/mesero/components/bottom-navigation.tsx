import React from "react";
import {
    BottomNavigation as MuiBottomNavigation,
    BottomNavigationAction,
    useMediaQuery,
    useTheme,
    Paper,
} from "@mui/material";
import { Delete, Edit, Visibility, ZoomIn } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import JoinFullIcon from "@mui/icons-material/JoinFull";
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
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({
    showZoomControls,
    setShowZoomControls,
    isEditMode,
    selectedTableId,
    onDeleteTable = () => {},
    handleAddTable = () => {},
    handleSave = () => {},
}) => {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

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
                            href="../mesero"
                        />,
                        <BottomNavigationAction
                            key={2}
                            label="Agregar Mesa"
                            icon={<AddIcon />}
                            onClick={handleAddTable}
                        />,
                        <BottomNavigationAction
                            key={3}
                            label="Unir mesas"
                            icon={<JoinFullIcon />}
                            component={Link}
                            href="mesero/editar"
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
                            onClick={() => {}}
                        />,
                    ]
                ) : (
                    <BottomNavigationAction
                        label="Editar"
                        icon={<Edit />}
                        component={Link}
                        href="mesero/editar"
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
        </Paper>
    );
};

export default BottomNavigation;
