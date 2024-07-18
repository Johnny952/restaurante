import React from "react";
import {
    BottomNavigation as MuiBottomNavigation,
    BottomNavigationAction,
    useMediaQuery,
    useTheme,
    Paper,
} from "@mui/material";
import {
    Delete,
    Edit,
    Settings,
    Visibility,
    ZoomIn,
} from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";

interface BottomNavigationProps {
    showZoomControls: boolean;
    setShowZoomControls: (show: boolean) => void;
    isEditMode: boolean;
    selectedTableId: string | null;
    onEditTable: () => void;
    onDeleteTable: () => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({
    showZoomControls,
    setShowZoomControls,
    isEditMode,
    selectedTableId,
    onEditTable,
    onDeleteTable,
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
                            key={1}
                            label="Editar Mesa"
                            icon={<Settings />}
                            onClick={onEditTable}
                        />,
                        <BottomNavigationAction
                            key={2}
                            label="Eliminar Mesa"
                            icon={<Delete />}
                            onClick={onDeleteTable}
                        />,
                    ]}
            </MuiBottomNavigation>
        </Paper>
    );
};

export default BottomNavigation;
