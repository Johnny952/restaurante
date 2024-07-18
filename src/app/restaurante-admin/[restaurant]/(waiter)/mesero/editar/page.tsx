"use client";
import React, { useState } from "react";
import { Box } from "@mui/material";
import TableMap from "../components/table-map";
import BottomNavigation from "../components/bottom-navigation";

export default function TablesEditPage() {
    const [showZoomControls, setShowZoomControls] = useState(false);
    const [selectedTableId, setSelectedTableId] = useState<string | null>(null);

    const handleEditTable = () => {
        // Implementa la lógica para editar la mesa seleccionada
        console.log("Editar mesa:", selectedTableId);
    };

    const handleDeleteTable = () => {
        // Implementa la lógica para eliminar la mesa seleccionada
        console.log("Eliminar mesa:", selectedTableId);
    };

    return (
        <>
            <Box sx={{ flex: 1, overflow: "hidden", position: "relative" }}>
                <TableMap
                    mode="edit"
                    showZoomControls={showZoomControls}
                    onSelectTable={setSelectedTableId}
                />
            </Box>
            <BottomNavigation
                showZoomControls={showZoomControls}
                setShowZoomControls={setShowZoomControls}
                isEditMode={true}
                selectedTableId={selectedTableId}
                onEditTable={handleEditTable}
                onDeleteTable={handleDeleteTable}
            />
        </>
    );
}
