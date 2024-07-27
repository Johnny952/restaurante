"use client";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import TableMap from "./components/table-map";
import BottomNavigation from "./components/bottom-navigation";
import { getByRestaurantLink, MapInterface } from "@/app/api/maps/get";
import {
    getById,
    getByMap,
    MapTableInterface,
} from "@/app/api/maps-tables/get";
import useLoadStore from "@/store/load-store";

interface TablesViewPageProps {
    params: {
        restaurant: string;
    };
    searchParams: {
        map?: string;
    };
}

export default function TablesViewPage({
    params: { restaurant: restaurantLink },
    searchParams: { map },
}: TablesViewPageProps) {
    const [showZoomControls, setShowZoomControls] = useState(false);
    const [maps, setMaps] = useState<MapInterface[]>([]);
    const [mapTables, setMapTables] = useState<MapTableInterface[] | null>([]);

    const setLoading = useLoadStore((state) => state.setLoading);

    useEffect(() => {
        setLoading(true);
        const fetchMaps = async () => {
            return getByRestaurantLink(restaurantLink);
        };
        const fetchData = async () => {
            return Promise.all([
                getByRestaurantLink(restaurantLink),
                getById(map as string),
            ]);
        };
        const fetchMapTables = async (id: string) => {
            return getByMap(id);
        };
        if (map) {
            fetchData()
                .then((data) => {
                    setMaps(data[0]);
                    setMapTables(data[1]);
                    setLoading(false);
                })
                .catch((error) => {
                    setLoading(false);
                    console.log(error);
                });
        } else {
            fetchMaps()
                .then((data) => {
                    if (data.length > 0) {
                        fetchMapTables(data[0].id).then((data2) => {
                            setMapTables(data2);
                            setLoading(false);
                        });
                    }
                    setMaps(data);
                })
                .catch((error) => {
                    setLoading(false);
                    console.log(error);
                });
        }
    }, [restaurantLink, map]);

    const [selectedTableId, setSelectedTableId] = useState<string | null>(null);

    return (
        <>
            <Box sx={{ flex: 1, overflow: "hidden", position: "relative" }}>
                <TableMap
                    initialTables={mapTables || []}
                    initialMap={
                        map
                            ? maps.find((m) => m.id.toString() === map)
                            : maps[0]
                    }
                    mode="view"
                    showZoomControls={showZoomControls}
                    selectedTable={selectedTableId}
                    onSelectTable={setSelectedTableId}
                    maps={maps}
                    selectedMap={map}
                />
            </Box>
            <BottomNavigation
                showZoomControls={showZoomControls}
                setShowZoomControls={setShowZoomControls}
                isEditMode={false}
                selectedTableId={selectedTableId}
            />
        </>
    );
}
