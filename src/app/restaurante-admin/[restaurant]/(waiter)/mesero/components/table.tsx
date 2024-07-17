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
}

const Table: React.FC<TableProps> = ({
    id,
    x,
    y,
    width,
    height,
    isEditable,
}) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: id,
        disabled: !isEditable,
    });

    const style = transform
        ? {
              transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
          }
        : undefined;

    const baseWidth = 350;
    const baseHeight = 600;
    const scale = Math.min(width / baseWidth, height / baseHeight);

    // Calcula las posiciones de las sillas
    const chairPositions = [
        { left: "50%", top: "-15%", transform: "translateX(-50%)" },
        {
            left: "-15%",
            top: "25%",
            transform: "translateY(-50%) rotate(-90deg)",
        },
        {
            left: "-15%",
            top: "75%",
            transform: "translateY(-50%) rotate(-90deg)",
        },
        {
            right: "-15%",
            top: "25%",
            transform: "translateY(-50%) rotate(90deg)",
        },
        {
            right: "-15%",
            top: "75%",
            transform: "translateY(-50%) rotate(90deg)",
        },
        {
            left: "50%",
            top: "85%",
            transform: "translateX(-50%) rotate(180deg)",
        },
    ];

    return (
        <Box
            ref={setNodeRef}
            sx={{
                ...style,
                position: "absolute",
                left: x,
                top: y,
                width: width,
                height: height,
                transition: "all 0.3s ease",
                "&:hover": isEditable
                    ? {
                          transform: "scale(1.05)",
                      }
                    : {},
                cursor: isEditable ? "move" : "default",
            }}
            {...attributes}
            {...listeners}
        >
            <div
                className={styles.tableWrapper}
                style={{
                    width: baseWidth,
                    height: baseHeight,
                    transform: `rotate(-90deg) scale(${scale})`,
                    transformOrigin: "top left",
                }}
            >
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
                    <div className={styles.plate}></div>
                    <div className={styles.plate}></div>
                    <div className={styles.plate}></div>
                    <div className={styles.plate}></div>
                    <div className={styles.plate}></div>
                    <div className={styles.plate}></div>
                    <div className={styles.knife}></div>
                    <div className={styles.fork}></div>
                </div>
            </div>
            <Typography
                variant="body1"
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: "white",
                    fontWeight: "bold",
                    textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
                    fontSize: `${18 * scale}px`,
                    zIndex: 3,
                    backgroundColor: "rgba(0,0,0,0.5)",
                    padding: "4px 8px",
                    borderRadius: "4px",
                }}
            >
                Mesa {id}
            </Typography>
        </Box>
    );
};

export default Table;
