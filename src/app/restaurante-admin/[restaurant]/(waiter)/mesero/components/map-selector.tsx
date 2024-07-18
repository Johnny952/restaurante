import React, { useState } from "react";
import {
    Box,
    Button,
    Popper,
    Grow,
    Paper,
    ClickAwayListener,
    MenuList,
    MenuItem,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import { styled } from "@mui/system";
import MapIcon from "@mui/icons-material/Map";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FloatingButton = styled(Button)(({ theme }) => ({
    position: "absolute",
    top: theme.spacing(2),
    left: theme.spacing(2),
    zIndex: 1100, // Aumentado para estar sobre el mapa
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    boxShadow: (theme.shadows as string[])[4],
    "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.95)",
    },
}));

const MapList = styled(Paper)(({ theme }) => ({
    maxHeight: "300px",
    overflowY: "auto",
    boxShadow: (theme.shadows as string[])[5],
}));

// Nuevo componente para el contenedor del Popper
const StyledPopper = styled(Popper)(({ theme }) => ({
    zIndex: 1200, // Asegura que esté por encima de todos los demás elementos
}));

interface MapSelectorProps {
    maps: string[];
    currentMap: number;
    onMapChange: (index: number) => void;
}

const MapSelector: React.FC<MapSelectorProps> = ({
    maps,
    currentMap,
    onMapChange,
}) => {
    const [open, setOpen] = useState(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: Event | React.SyntheticEvent) => {
        if (
            anchorRef.current &&
            anchorRef.current.contains(event.target as HTMLElement)
        ) {
            return;
        }
        setOpen(false);
    };

    const handleListKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === "Tab") {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === "Escape") {
            setOpen(false);
        }
    };

    return (
        <>
            <FloatingButton
                ref={anchorRef}
                onClick={handleToggle}
                startIcon={<MapIcon />}
                endIcon={<ExpandMoreIcon />}
                variant="contained"
                disableElevation
            >
                {maps[currentMap]}
            </FloatingButton>
            <StyledPopper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-start"
                transition
                disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === "bottom-start"
                                    ? "left top"
                                    : "left bottom",
                        }}
                    >
                        <MapList>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                    autoFocusItem={open}
                                    onKeyDown={handleListKeyDown}
                                >
                                    {maps.map((map, index) => (
                                        <MenuItem
                                            key={index}
                                            selected={index === currentMap}
                                            onClick={() => {
                                                onMapChange(index);
                                                setOpen(false);
                                            }}
                                        >
                                            <ListItemIcon>
                                                <MapIcon fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText primary={map} />
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </MapList>
                    </Grow>
                )}
            </StyledPopper>
        </>
    );
};

export default MapSelector;
