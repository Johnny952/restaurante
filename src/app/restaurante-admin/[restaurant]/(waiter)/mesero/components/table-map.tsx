"use client";
import React, { useEffect, useRef, useState } from "react";
import { Box, Slider } from "@mui/material";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import {
    DndContext,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import styles from "./table-map.module.css";
import Table from "./table";
import MapSelector from "./map-selector";

interface TableData {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
}

const initialTables: TableData[] = [
    { id: "1", x: 200, y: 200, width: 90, height: 180 },
    { id: "2", x: 400, y: 400, width: 90, height: 180 },
    { id: "3", x: 600, y: 600, width: 90, height: 180 },
];

interface TableMapProps {
    mode: "view" | "edit";
    showZoomControls: boolean;
    onSelectTable: (tableId: string | null) => void;
}

const TableMap: React.FC<TableMapProps> = ({
    mode,
    showZoomControls,
    onSelectTable,
}) => {
    const [tables, setTables] = useState<TableData[]>(initialTables);
    const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });
    const contentRef = useRef<HTMLDivElement>(null);
    const initialScale = 0.4;
    const [currentMap, setCurrentMap] = useState(0);
    const maps = [
        "Planta baja",
        "Primer piso",
        "Terraza",
        "Jardín",
        "Salón VIP",
    ];
    const [isDragging, setIsDragging] = useState(false);
    const [selectedTableId, setSelectedTableId] = useState<string | null>(null);

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

    const handleDragEnd = (event: any) => {
        setIsDragging(false);
        const { active, over } = event;
        if (active && over) {
            setTables((prevTables) =>
                prevTables.map((table) => {
                    if (table.id === active.id) {
                        return {
                            ...table,
                            x: over.x - table.width / 2,
                            y: over.y - table.height / 2,
                        };
                    }
                    return table;
                })
            );
        }
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

    const handleMapChange = (newValue: number) => {
        setCurrentMap(newValue);
        // Aquí puedes cargar las mesas correspondientes al mapa seleccionado
        // Por ejemplo:
        // setTables(getTablesForMap(newValue));
    };

    const handleMapClick = (event: React.MouseEvent) => {
        // Verifica si el clic fue directamente en el mapa
        if (event.target === event.currentTarget) {
            setSelectedTableId(null);
            onSelectTable(null);
        }
    };

    const handleTableClick = (tableId: string) => {
        if (mode === "edit") {
            const newSelectedId = tableId === selectedTableId ? null : tableId;
            setSelectedTableId(newSelectedId);
            onSelectTable(newSelectedId);
        }
    };

    return (
        <Box
            className={styles.mapContainer}
            sx={{ position: "relative", zIndex: 1000 }}
        >
            <MapSelector
                maps={maps}
                currentMap={currentMap}
                onMapChange={handleMapChange}
            />
            <DndContext
                sensors={sensors}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
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
                    {({ setTransform }) => (
                        <>
                            {showZoomControls && (
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
                            <TransformComponent
                                wrapperClass={styles.transformWrapper}
                                contentClass={styles.transformContent}
                            >
                                <Box
                                    className={styles.tablesContainer}
                                    ref={contentRef}
                                    style={{
                                        width: "2000px",
                                        height: "2000px",
                                        position: "relative",
                                    }}
                                    onClick={handleMapClick}
                                >
                                    {tables.map((table) => (
                                        <Table
                                            key={table.id}
                                            id={table.id}
                                            x={table.x}
                                            y={table.y}
                                            width={table.width}
                                            height={table.height}
                                            isEditable={mode === "edit"}
                                            isDragging={isDragging}
                                            isSelected={
                                                table.id === selectedTableId
                                            }
                                            onClick={() =>
                                                handleTableClick(table.id)
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
