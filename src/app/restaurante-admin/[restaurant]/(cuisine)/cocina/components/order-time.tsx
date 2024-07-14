"use client";
import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

interface Props {
    startTime: Date;
}

export const OrderTimer: React.FC<Props> = ({ startTime }) => {
    const [timeElapsed, setTimeElapsed] = useState("");

    useEffect(() => {
        const updateElapsedTime = () => {
            setTimeElapsed(
                formatDistanceToNow(startTime, { addSuffix: true, locale: es })
            );
        };

        updateElapsedTime();
        const timer = setInterval(updateElapsedTime, 60000); // Actualiza cada minuto

        return () => clearInterval(timer);
    }, [startTime]);

    return (
        <Typography color="text.secondary" sx={{ fontStyle: "italic" }}>
            {timeElapsed}
        </Typography>
    );
};
