"use client";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import TableMap from "../../../components/table-map";
import BottomNavigation from "../../../components/bottom-navigation";
import { getByRestaurantLink, MapInterface } from "@/app/api/maps/get";
import { getById, MapTableInterface } from "@/app/api/maps-tables/get";
import useLoadStore from "@/store/load-store";
import { notFound, useRouter } from "next/navigation";
import useSnackStore from "@/store/snackbar-store";

interface TablesViewPageProps {
    params: {
        restaurant: string;
        mapId: string;
    };
}

export default function TablesViewPage({
    params: { restaurant: restaurantLink, mapId },
}: TablesViewPageProps) {
    const [showZoomControls, setShowZoomControls] = useState(false);
    const [maps, setMaps] = useState<MapInterface[]>([]);
    const [mapTables, setMapTables] = useState<MapTableInterface[]>([]);
    const currentMap = maps.find((m) => m.id === mapId);
    const setLoading = useLoadStore((state) => state.setLoading);
    const snackError = useSnackStore((state) => state.setOpenError);

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            return Promise.all([
                getByRestaurantLink(restaurantLink),
                getById(mapId),
            ]);
        };
        fetchData()
            .then((data) => {
                if (!data[0].some((m) => m.id.toString() === mapId)) {
                    notFound();
                }
                setMaps(data[0]);
                setMapTables(data[1]);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                snackError(`Ocurrio un error: ${error}`);
            });
    }, [restaurantLink, mapId]);

    const [selectedTableId, setSelectedTableId] = useState<string | null>(null);

    const router = useRouter();

    const handleMapChange = (newValue: string) => {
        router.push(`${newValue}`);
    };

    return (
        <>
            <Box sx={{ flex: 1, overflow: "hidden", position: "relative" }}>
                <TableMap
                    initialTables={mapTables}
                    initialMap={currentMap}
                    mode="view"
                    showZoomControls={showZoomControls}
                    selectedTable={selectedTableId}
                    onSelectTable={setSelectedTableId}
                    maps={maps}
                    selectedMap={mapId}
                    handleMapChange={handleMapChange}
                />
            </Box>
            <BottomNavigation
                showZoomControls={showZoomControls}
                setShowZoomControls={setShowZoomControls}
                isEditMode={false}
                selectedTableId={selectedTableId}
                editHref={`../editar/${mapId}`}
            />
        </>
    );
}
