"use client";
import React, { useEffect, useRef, useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { Box } from "@mui/material";
import styles from "./table.module.css";

export interface BaseTableProps {
    id: string;
    x: number;
    y: number;
    isEditable: boolean;
    isDragging: boolean;
    isSelected: boolean;
    onClick?: () => void;
    isInDrawer?: boolean;
}

export interface TableProps extends BaseTableProps {
    people: 2 | 4 | 6;
}

const Table: React.FC<TableProps> = ({
    id,
    x,
    y,
    isEditable,
    isDragging,
    isSelected,
    onClick = () => {},
    people,
    isInDrawer = false,
}) => {
    const [boxDimensions, setBoxDimensions] = useState({ width: 0, height: 0 });
    const paperRef = useRef<HTMLDivElement>(null);
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id,
        disabled: !isEditable || isInDrawer,
    });
    const width = 125;
    const height = 200;

    const peopleMap = {
        2: {
            chairPositions: [
                { left: "45%", top: "0%", transform: "translateX(-50%)" },
                {
                    left: "45%",
                    top: "60%",
                    transform: "translateX(-50%) rotate(180deg)",
                },
            ],
            platePositions: [
                { left: "34%", top: "20%", transform: "rotate(0deg)" },
                { left: "37%", top: "52%", transform: "rotate(180deg)" },
            ],
            width: "90%",
            height: "55%",
            top: "15%",
        },
        4: {
            chairPositions: [
                {
                    left: "-25%",
                    top: "20%",
                    transform: "translateY(-50%) rotate(-90deg)",
                },
                {
                    left: "-25%",
                    top: "60%",
                    transform: "translateY(-50%) rotate(-90deg)",
                },
                {
                    right: "-25%",
                    top: "20%",
                    transform: "translateY(-50%) rotate(90deg)",
                },
                {
                    left: "85%",
                    top: "60%",
                    transform: "translateY(-50%) rotate(90deg)",
                },
            ],
            platePositions: [
                { left: "3%", top: "15%", transform: "rotate(-90deg)" },
                { left: "3%", top: "55%", transform: "rotate(-90deg)" },
                { right: "3%", top: "15%", transform: "rotate(90deg)" },
                { right: "3%", top: "55%", transform: "rotate(90deg)" },
            ],
            width: "100%",
            height: "80%",
            top: 0,
        },
        6: {
            chairPositions: [
                { left: "50%", top: "-15%", transform: "translateX(-50%)" },
                {
                    left: "-25%",
                    top: "30%",
                    transform: "translateY(-50%) rotate(-90deg)",
                },
                {
                    left: "-25%",
                    top: "70%",
                    transform: "translateY(-50%) rotate(-90deg)",
                },
                {
                    right: "-25%",
                    top: "30%",
                    transform: "translateY(-50%) rotate(90deg)",
                },
                {
                    left: "85%",
                    top: "70%",
                    transform: "translateY(-50%) rotate(90deg)",
                },
                {
                    left: "54%",
                    top: "90%",
                    transform: "translateX(-50%) rotate(180deg)",
                },
            ],
            platePositions: [
                { left: "39%", top: "3%", transform: "rotate(0deg)" },
                { left: "3%", top: "25%", transform: "rotate(-90deg)" },
                { left: "3%", top: "65%", transform: "rotate(-90deg)" },
                { right: "3%", top: "25%", transform: "rotate(90deg)" },
                { right: "3%", top: "65%", transform: "rotate(90deg)" },
                { left: "43%", top: "85%", transform: "rotate(180deg)" },
            ],
            width: "100%",
            height: "100%",
            top: 0,
        },
    };

    useEffect(() => {
        if (isInDrawer && paperRef.current) {
            const paperWidth = paperRef.current.offsetWidth;
            const paperHeight = paperRef.current.offsetHeight;
            const tableAspectRatio = width / height;
            const paperAspectRatio = paperWidth / paperHeight;

            let newWidth, newHeight;
            if (tableAspectRatio > paperAspectRatio) {
                newWidth = paperWidth;
                newHeight = paperWidth / tableAspectRatio;
            } else {
                newHeight = paperHeight;
                newWidth = paperHeight * tableAspectRatio;
            }
            setBoxDimensions({ width: newWidth, height: newHeight });
        }
    }, [isInDrawer, width, height]);

    const style: React.CSSProperties = {
        position: "absolute",
        left: x,
        top: y,
        width: width,
        height: height,
        cursor: "grab",
        transition: isDragging ? "none" : "all 0.3s ease",
        transform: transform
            ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
            : undefined,
        zIndex: isDragging ? 1000 : isSelected ? 999 : 1,
    };

    const getScaleFactor = () => {
        if (isInDrawer) {
            return (
                Math.min(
                    boxDimensions.width / width,
                    boxDimensions.height / height
                ) * 0.55
            );
        }
        return 1;
    };

    const scaleFactor = getScaleFactor();

    const tableWrapperStyle: React.CSSProperties = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: `translate(-50%, -50%) scale(${scaleFactor})`,
        width: `${width}px`,
        height: `${height}px`,
    };

    const handleClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        onClick();
    };

    const content = (
        <div className={styles.tableWrapper} style={tableWrapperStyle}>
            <div
                className={styles.theTable}
                style={{
                    width: peopleMap[people].width,
                    height: peopleMap[people].height,
                    top: peopleMap[people].top,
                }}
            />
            {peopleMap[people].chairPositions.map((pos, index) => (
                <div
                    key={`chair-${index}`}
                    className={`${styles.chair} ${index === 0 || index === 5 ? styles.chairLg : ""}`}
                    style={{
                        position: "absolute",
                        ...pos,
                        width: `${index === 0 || index === 5 ? "40%" : "40%"}`,
                        height: `${index === 0 || index === 5 ? "25%" : "25%"}`,
                    }}
                />
            ))}
            {peopleMap[people].platePositions.map((pos, index) => (
                <div
                    key={`plate-${index}`}
                    className={styles.plate}
                    style={{
                        position: "absolute",
                        ...pos,
                        width: "20%",
                        height: "12%",
                    }}
                />
            ))}
        </div>
    );

    return isInDrawer ? (
        <Box
            ref={paperRef}
            sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
            }}
        >
            <Box
                sx={{
                    width: `${boxDimensions.width}px`,
                    height: `${boxDimensions.height}px`,
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {content}
            </Box>
        </Box>
    ) : (
        <Box
            ref={setNodeRef}
            sx={{
                ...style,
                boxShadow: isSelected
                    ? `0 0 0 2px rgba(63, 81, 181, 0.5), 0 0 10px rgba(63, 81, 181, 0.5)`
                    : "none",
            }}
            {...attributes}
            {...listeners}
            onClick={handleClick}
        >
            {content}
        </Box>
    );
};

export default Table;
