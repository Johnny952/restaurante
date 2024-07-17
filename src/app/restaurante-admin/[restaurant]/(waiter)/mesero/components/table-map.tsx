"use client";
import React, { useRef, useState } from "react";
import { Box, Slider } from "@mui/material";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { DndContext } from "@dnd-kit/core";
import styles from "./table-map.module.css";
import Table from "./table";

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
}

const TableMap: React.FC<TableMapProps> = ({ mode, showZoomControls }) => {
    const [tables, setTables] = useState<TableData[]>(initialTables);

    const handleDragEnd = (event: any) => {
        if (mode === "edit") {
            const { active, over } = event;
            if (active && over) {
                setTables((prevTables) =>
                    prevTables.map((table) => {
                        if (table.id === active.id) {
                            const baseWidth = 350;
                            const baseHeight = 600;
                            const scale = Math.min(
                                table.width / baseWidth,
                                table.height / baseHeight
                            );
                            return {
                                ...table,
                                x: over.x - (baseWidth * scale) / 2,
                                y: over.y - (baseHeight * scale) / 2,
                            };
                        }
                        return table;
                    })
                );
            }
        }
    };

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

    return (
        <Box className={styles.mapContainer}>
            <DndContext onDragEnd={handleDragEnd}>
                <TransformWrapper
                    initialScale={1}
                    minScale={0.1}
                    maxScale={3}
                    limitToBounds={false}
                    centerOnInit={true}
                    centerZoomedOut={false}
                    doubleClick={{ disabled: true }}
                >
                    {({ setTransform }) => (
                        <>
                            {showZoomControls && (
                                <Box className={styles.zoomControls}>
                                    <Slider
                                        orientation="vertical"
                                        defaultValue={50}
                                        aria-labelledby="vertical-slider"
                                        valueLabelDisplay="auto"
                                        step={1}
                                        marks
                                        min={5}
                                        max={150}
                                        onChange={handleZoom(setTransform)}
                                    />
                                </Box>
                            )}
                            <TransformComponent
                                wrapperClass={styles.transformWrapper}
                                contentClass={styles.transformContent}
                            >
                                <Box className={styles.tablesContainer}>
                                    {tables.map((table) => (
                                        <Table
                                            key={table.id}
                                            id={table.id}
                                            x={table.x}
                                            y={table.y}
                                            width={table.width}
                                            height={table.height}
                                            isEditable={mode === "edit"}
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
