"use client";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import TableMap from "../../components/table-map";
import BottomNavigation from "../../components/bottom-navigation";
import { getByRestaurantLink, MapInterface } from "@/app/api/maps/get";
import { getByMap, MapTableInterface } from "@/app/api/maps-tables/get";
import useLoadStore from "@/store/load-store";
import { useRouter } from "next/navigation";

interface TablesViewPageProps {
    params: {
        restaurant: string;
    };
}

export default function TablesViewPage({
    params: { restaurant: restaurantLink },
}: TablesViewPageProps) {
    const [showZoomControls, setShowZoomControls] = useState(false);
    const [maps, setMaps] = useState<MapInterface[]>([]);
    const [mapTables, setMapTables] = useState<MapTableInterface[]>([]);
    const setLoading = useLoadStore((state) => state.setLoading);
    const router = useRouter();

    const handleMapChange = (newValue: string) => {
        router.push(`ver/${newValue}`);
    };

    useEffect(() => {
        setLoading(true);
        const fetchMaps = async () => {
            return getByRestaurantLink(restaurantLink);
        };
        const fetchMapTables = async (id: string) => {
            return getByMap(id);
        };
        fetchMaps()
            .then((data) => {
                if (data.length > 0) {
                    fetchMapTables(data[0].id).then((data2) => {
                        setMapTables(data2);
                        setLoading(false);
                    });
                } else {
                    setLoading(false);
                }
                setMaps(data);
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            });
    }, [restaurantLink]);

    const [selectedTableId, setSelectedTableId] = useState<string | null>(null);

    return (
        <>
            <Box sx={{ flex: 1, overflow: "hidden", position: "relative" }}>
                <TableMap
                    initialTables={mapTables}
                    initialMap={maps[0]}
                    mode="view"
                    showZoomControls={showZoomControls}
                    selectedTable={selectedTableId}
                    onSelectTable={setSelectedTableId}
                    maps={maps}
                    selectedMap={maps[0] ? maps[0].id : undefined}
                    handleMapChange={handleMapChange}
                />
            </Box>
            <BottomNavigation
                showZoomControls={showZoomControls}
                setShowZoomControls={setShowZoomControls}
                isEditMode={false}
                selectedTableId={selectedTableId}
                editHref="editar"
            />
        </>
    );
}
