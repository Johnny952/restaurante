import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { Box, Typography } from "@mui/material";
import styles from "./table.module.css";

interface TableProps {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    isEditable: boolean;
    isDragging: boolean;
    isSelected: boolean;
    onClick: () => void;
}

const Table: React.FC<TableProps> = ({
    id,
    x,
    y,
    width,
    height,
    isEditable,
    isDragging,
    isSelected,
    onClick,
}) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: id,
        disabled: !isEditable,
    });

    const baseWidth = 350;
    const baseHeight = 600;
    const scale = Math.min(width / baseWidth, height / baseHeight);

    const style: React.CSSProperties = {
        position: "absolute",
        left: x,
        top: y,
        width: width,
        height: height,
        cursor: isEditable ? "grab" : "default",
        transition: isDragging ? "none" : "all 0.3s ease",
        transform: transform
            ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
            : undefined,
        zIndex: isDragging ? 1000 : isSelected ? 999 : 1,
        boxShadow: isSelected ? "0 0 0 2px #3f51b5, 0 0 10px #3f51b5" : "none",
    };

    const tableWrapperStyle: React.CSSProperties = {
        width: baseWidth,
        height: baseHeight,
        transform: `rotate(-90deg) scale(${scale * (isDragging ? 0.95 : 1)})`,
        transformOrigin: "top left",
        position: "absolute",
        top: `${530 * scale}px`, // Ajustar para dejar espacio para la etiqueta
        left: `${190 * scale}px`,
        right: 0,
        bottom: 0,
    };

    const labelStyle: React.CSSProperties = {
        position: "absolute",
        top: `-${200 * scale}px`, // Aumentado para dar más espacio
        left: "75%",
        transform: "translateX(-50%)",
        color: "white",
        fontWeight: "bold",
        textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
        fontSize: `${Math.max(16, Math.min(24, 20 * scale))}px`,
        zIndex: 3,
        backgroundColor: "rgba(0,0,0,0.7)",
        padding: "4px 12px",
        borderRadius: "4px",
        whiteSpace: "nowrap",
    };

    const chairPositions = [
        { left: "50%", top: "-15%", transform: "translateX(-50%)" },
        {
            left: "-15%",
            top: "30%",
            transform: "translateY(-50%) rotate(-90deg)",
        },
        {
            left: "-15%",
            top: "70%",
            transform: "translateY(-50%) rotate(-90deg)",
        },
        {
            right: "-15%",
            top: "30%",
            transform: "translateY(-50%) rotate(90deg)",
        },
        {
            right: "-15%",
            top: "70%",
            transform: "translateY(-50%) rotate(90deg)",
        },
        {
            left: "50%",
            top: "85%",
            transform: "translateX(-50%) rotate(180deg)",
        },
    ];

    const platePositions = [
        { left: 120, top: 20, transform: "rotate(0deg)" },
        { left: 20, top: 134, transform: "rotate(-90deg)" },
        { left: 20, top: 365, transform: "rotate(-90deg)" },
        { right: 20, top: 134, transform: "rotate(90deg)" },
        { right: 20, top: 365, transform: "rotate(90deg)" },
        { left: 120, top: 480, transform: "rotate(180deg)" },
    ];

    const handleClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        onClick();
    };

    return (
        <Box
            ref={setNodeRef}
            sx={{
                ...style,
                boxShadow: isSelected
                    ? `0 0 0 ${20 * scale}px rgba(63, 81, 181, 0.5), 0 0 ${10 * scale}px rgba(63, 81, 181, 0.5)`
                    : "none",
                padding: `${40 * scale}px ${500 * scale}px ${20 * scale}px`,
                boxSizing: "border-box",
            }}
            {...attributes}
            {...listeners}
            onClick={handleClick}
        >
            <Typography variant="body1" sx={labelStyle}>
                Mesa {id}
            </Typography>
            <div className={styles.tableWrapper} style={tableWrapperStyle}>
                {chairPositions.map((pos, index) => (
                    <div
                        key={index}
                        className={`${styles.chair} ${index === 0 ? styles.chairLg : ""}`}
                        style={{
                            position: "absolute",
                            ...pos,
                            zIndex: 1,
                        }}
                    ></div>
                ))}
                <div
                    className={styles.theTable}
                    style={{ zIndex: 2, position: "relative" }}
                >
                    {platePositions.map((pos, index) => (
                        <React.Fragment key={index}>
                            <div className={styles.plate} style={pos}></div>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </Box>
    );
};

export default Table;
