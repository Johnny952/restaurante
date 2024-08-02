"use client";

import { Box } from "@mui/material";
import TableMap from "../../components/table-map";
import BottomNavigation from "../../components/bottom-navigation";
import { useEffect, useState } from "react";
import { MapTableInterface } from "@/app/api/maps-tables/get";
import { MapInterface } from "@/app/api/maps/get";
import { useRouter } from "next/navigation";
import Loader from "../../components/loader";

interface ViewProps {
    mapTables?: MapTableInterface[];
    maps: MapInterface[];
    currentMap?: MapInterface;
    selectedMap?: boolean;
    editHref?: string;
}

export default function View({
    mapTables,
    maps,
    currentMap,
    selectedMap = false,
    editHref = `../editar/${currentMap?.id}`,
}: ViewProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [selectedTableId, setSelectedTableId] = useState<string | null>(null);
    const [showZoomControls, setShowZoomControls] = useState(false);

    const router = useRouter();

    useEffect(() => {
        // Ocultar el loader cuando el componente se monte
        const timer = setTimeout(() => setIsLoading(false), 100);
        return () => clearTimeout(timer);
    }, []);

    const handleMapChange = (newValue: string) => {
        const url = selectedMap ? newValue.toString() : `ver/${newValue}`;
        router.push(url);
    };

    return (
        <>
            <Loader isLoading={isLoading} />
            {!isLoading && (
                <>
                    <Box
                        sx={{
                            flex: 1,
                            overflow: "hidden",
                            position: "relative",
                        }}
                    >
                        <TableMap
                            initialTables={mapTables || []}
                            initialMap={currentMap}
                            mode="view"
                            showZoomControls={showZoomControls}
                            selectedTable={selectedTableId}
                            onSelectTable={setSelectedTableId}
                            maps={maps}
                            selectedMap={currentMap?.id.toString()}
                            handleMapChange={handleMapChange}
                        />
                    </Box>
                    <BottomNavigation
                        showZoomControls={showZoomControls}
                        setShowZoomControls={setShowZoomControls}
                        isEditMode={false}
                        selectedTableId={selectedTableId}
                        editHref={editHref}
                    />
                </>
            )}
        </>
    );
}
