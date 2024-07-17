import React from "react";
import {
    BottomNavigation as MuiBottomNavigation,
    BottomNavigationAction,
} from "@mui/material";
import { Edit, Visibility, ZoomIn } from "@mui/icons-material";

interface BottomNavigationProps {
    mode: "view" | "edit";
    setMode: (mode: "view" | "edit") => void;
    showZoomControls: boolean;
    setShowZoomControls: (show: boolean) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({
    mode,
    setMode,
    showZoomControls,
    setShowZoomControls,
}) => {
    return (
        <MuiBottomNavigation
            showLabels
            value={mode}
            onChange={(event, newValue) => {
                if (newValue === "view" || newValue === "edit") {
                    setMode(newValue);
                }
            }}
        >
            <BottomNavigationAction
                label="Ver"
                icon={<Visibility />}
                value="view"
            />
            <BottomNavigationAction
                label="Editar"
                icon={<Edit />}
                value="edit"
            />
            <BottomNavigationAction
                label="Zoom"
                icon={<ZoomIn />}
                onClick={() => setShowZoomControls(!showZoomControls)}
            />
        </MuiBottomNavigation>
    );
};

export default BottomNavigation;
