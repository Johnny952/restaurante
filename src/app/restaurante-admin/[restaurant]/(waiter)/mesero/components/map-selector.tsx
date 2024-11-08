import React, { useState } from "react";
import {
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
import Add from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { MapType } from "@/lib/models/map";
// import { MapInterface } from "@/app/api/maps/get";

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

const StyledPopper = styled(Popper)(({ theme }) => ({
    zIndex: 1200,
}));

interface MapSelectorProps {
    maps: MapType[];
    currentMap?: string;
    onMapChange: (index: string) => void;
    onMapAdd: () => void;
    showAddMap: boolean;
}

const MapSelector: React.FC<MapSelectorProps> = ({
    maps,
    currentMap,
    onMapChange,
    onMapAdd,
    showAddMap,
}) => {
    const [open, setOpen] = useState(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);

    const selectedMap =
        maps.find((map) => map.id.toString() === currentMap) || maps[0];

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
                sx={{
                    color:
                        selectedMap && selectedMap.deleted ? "red" : undefined,
                }}
            >
                {selectedMap ? selectedMap?.name : "No hay mapas"}
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
                                    {maps.map((map, index) =>
                                        !showAddMap && map.deleted ? null : (
                                            <MenuItem
                                                sx={{
                                                    color: map.deleted
                                                        ? "red"
                                                        : undefined,
                                                }}
                                                key={index}
                                                selected={map.id.toString() === currentMap}
                                                onClick={() => {
                                                    onMapChange(map.id.toString());
                                                    setOpen(false);
                                                }}
                                            >
                                                <ListItemIcon>
                                                    <MapIcon
                                                        color={
                                                            map.deleted
                                                                ? "error"
                                                                : undefined
                                                        }
                                                        fontSize="small"
                                                    />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={map.name}
                                                    sx={{
                                                        textDecoration:
                                                            map.deleted
                                                                ? "line-through"
                                                                : undefined,
                                                    }}
                                                />
                                            </MenuItem>
                                        )
                                    )}
                                    {showAddMap ? (
                                        <MenuItem
                                            onClick={() => {
                                                onMapAdd();
                                                setOpen(false);
                                            }}
                                        >
                                            <ListItemIcon>
                                                <Add fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText primary="Agregar" />
                                        </MenuItem>
                                    ) : null}
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
