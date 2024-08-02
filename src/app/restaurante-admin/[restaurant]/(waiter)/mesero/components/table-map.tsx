import React, { useEffect, useRef, useState } from "react";
import { Box, Slider, useMediaQuery, useTheme } from "@mui/material";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import {
    DndContext,
    PointerSensor,
    useDroppable,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import styles from "./table-map.module.css";
import Table from "./table";
import MapSelector from "./map-selector";
import { MapInterface } from "@/app/api/maps/get";
import { MapTableInterface } from "@/app/api/maps-tables/get";

interface TableMapProps {
    mode: "view" | "edit";
    showZoomControls: boolean;
    onSelectTable: (tableId: string | null) => void;
    selectedTable?: string | null;
    maps: MapInterface[];
    initialTables: MapTableInterface[];
    initialMap?: MapInterface;
    showAddMap?: boolean;
    handleDragEnd?: (props: { tableId: string; x: number; y: number }) => void;
    selectedMap?: string;
    handleMapChange?: (newValue: string) => void;
    handleAddMap?: () => void;
}

const TableMap: React.FC<TableMapProps> = ({
    mode,
    showZoomControls,
    onSelectTable,
    selectedTable,
    maps,
    initialTables,
    initialMap,
    showAddMap = false,
    selectedMap,
    handleDragEnd = () => {},
    handleMapChange = () => {},
    handleAddMap = () => {},
}) => {
    const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });
    const contentRef = useRef<HTMLDivElement>(null);
    const initialScale = 0.4;
    const [isDragging, setIsDragging] = useState(false);
    const width = initialMap ? initialMap.width : 2000;
    const height = initialMap ? initialMap.height : 2000;

    const { setNodeRef } = useDroppable({
        id: "map-droppable",
        data: {
            type: "map",
        },
    });

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    );

    const handleDragStart = () => {
        setIsDragging(true);
    };

    useEffect(() => {
        const calculateInitialPosition = () => {
            if (contentRef.current) {
                const contentWidth = contentRef.current.scrollWidth;
                const contentHeight = contentRef.current.scrollHeight;
                const viewportWidth = window.innerWidth;
                const viewportHeight = window.innerHeight;

                // Ajustamos para el zoom inicial
                const scaledContentWidth = contentWidth * initialScale;
                const scaledContentHeight = contentHeight * initialScale;

                const centerX = (scaledContentWidth - viewportWidth) / 2;
                const centerY = (scaledContentHeight - viewportHeight) / 2;

                setInitialPosition({ x: -centerX, y: -centerY });
            }
        };

        calculateInitialPosition();
        window.addEventListener("resize", calculateInitialPosition);

        return () => {
            window.removeEventListener("resize", calculateInitialPosition);
        };
    }, []);

    const handleZoom =
        (
            setTransform: (
                newPositionX: number,
                newPositionY: number,
                newScale: number,
                animationTime?: number,
                animationType?:
                    | "easeOut"
                    | "linear"
                    | "easeInQuad"
                    | "easeOutQuad"
                    | "easeInOutQuad"
                    | "easeInCubic"
                    | "easeOutCubic"
                    | "easeInOutCubic"
                    | "easeInQuart"
                    | "easeOutQuart"
                    | "easeInOutQuart"
                    | "easeInQuint"
                    | "easeOutQuint"
                    | "easeInOutQuint"
            ) => void
        ) =>
        (event: Event, newValue: number | number[]) => {
            const scale = Array.isArray(newValue) ? newValue[0] : newValue;
            setTransform(0, 0, scale / 50, 300, "easeOut");
        };

    const handleMapClick = (event: React.MouseEvent) => {
        if (event.target === event.currentTarget) {
            onSelectTable(null);
        }
    };

    const handleTableClick = (tableId: string) => {
        const newSelectedId = tableId === selectedTable ? null : tableId;
        onSelectTable(newSelectedId);
    };

    const handleDragEndInternal = (event: any) => {
        const { active, delta } = event;
        if (active && delta) {
            const currentTable = initialTables.find(
                (table) => table.id.toString() === active.id
            );
            if (currentTable) {
                const newX = currentTable.position_x + delta.x;
                const newY = currentTable.position_y + delta.y;
                handleDragEnd({
                    tableId: active.id,
                    x: newX < 0 ? 0 : newX > width ? width : newX,
                    y: newY < 0 ? 0 : newY > height ? height : newY,
                });
            }
        }
        setIsDragging(false);
    };
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Box
            className={styles.mapContainer}
            sx={{
                position: "relative",
                zIndex: 1000,
                height: isMobile ? "calc(100vh - 120px)" : "100%",
                overflow: "hidden",
            }}
        >
            <MapSelector
                maps={maps}
                currentMap={selectedMap}
                onMapChange={handleMapChange}
                onMapAdd={handleAddMap}
                showAddMap={showAddMap}
            />
            <DndContext
                sensors={sensors}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEndInternal}
            >
                <TransformWrapper
                    initialPositionX={initialPosition.x}
                    initialPositionY={initialPosition.y}
                    initialScale={initialScale}
                    minScale={0.1}
                    maxScale={3}
                    limitToBounds={false}
                    centerOnInit={false}
                    centerZoomedOut={false}
                    doubleClick={{ disabled: true }}
                    panning={{
                        disabled: isDragging,
                        velocityDisabled: true,
                    }}
                    pinch={{ disabled: false }}
                >
                    {({ setTransform, zoomIn, zoomOut }) => (
                        <>
                            {showZoomControls && !isMobile && (
                                <Box className={styles.zoomControls}>
                                    <Slider
                                        orientation="vertical"
                                        defaultValue={300}
                                        aria-labelledby="vertical-slider"
                                        valueLabelDisplay="auto"
                                        step={1}
                                        marks
                                        min={10}
                                        max={300}
                                        onChange={handleZoom(setTransform)}
                                        sx={{
                                            "& .MuiSlider-thumb": {
                                                width: 28,
                                                height: 28,
                                            },
                                            "& .MuiSlider-valueLabel": {
                                                fontSize: "0.875rem",
                                            },
                                            height: 200,
                                        }}
                                    />
                                </Box>
                            )}
                            {isMobile && (
                                <Box className={styles.mobileZoomControls}>
                                    <button onClick={() => zoomIn()}>+</button>
                                    <button onClick={() => zoomOut()}>-</button>
                                </Box>
                            )}
                            <TransformComponent
                                wrapperClass={styles.transformWrapper}
                                contentClass={styles.transformContent}
                            >
                                <Box
                                    ref={(node) => {
                                        setNodeRef(node as HTMLElement);
                                    }}
                                    className={styles.tablesContainer}
                                    style={{
                                        width: `${width}px`,
                                        height: `${height}px`,
                                        position: "relative",
                                    }}
                                    onClick={handleMapClick}
                                >
                                    {initialTables.map((table) => (
                                        <Table
                                            typeId={table.table_id.toString()}
                                            key={table.id.toString()}
                                            id={table.id.toString()}
                                            x={table.position_x}
                                            y={table.position_y}
                                            isEditable={mode === "edit"}
                                            isDragging={isDragging}
                                            isSelected={
                                                table.id.toString() ===
                                                selectedTable
                                            }
                                            onClick={() =>
                                                handleTableClick(
                                                    table.id.toString()
                                                )
                                            }
                                        />
                                    ))}
                                </Box>
                            </TransformComponent>
                        </>
                    )}
                </TransformWrapper>
            </DndContext>
        </Box>
    );
};

export default TableMap;
