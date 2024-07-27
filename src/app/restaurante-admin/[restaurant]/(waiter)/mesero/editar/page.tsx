"use client";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import TableMap from "../components/table-map";
import BottomNavigation from "../components/bottom-navigation";
import { getByRestaurantLink, MapInterface } from "@/app/api/maps/get";
import { RestaurantInterface } from "@/app/api/restaurants/index.types";
import { getByLink } from "@/app/api/restaurants/get";
import {
    getById,
    getByMap,
    MapTableInterface,
} from "@/app/api/maps-tables/get";
import AddMapDialog from "../components/add-map-dialog";
import { useRouter } from "next/navigation";
import AddTableDrawer from "../components/add-table";
import { putTables } from "@/app/api/maps-tables/put";
import useLoadStore from "@/store/load-store";

interface TablesEditPageProps {
    params: {
        restaurant: string;
    };
    searchParams: {
        agregarMapa?: string;
        agregarMesa?: string;
        map?: string;
    };
}

export default function TablesEditPage({
    params: { restaurant: restaurantLink },
    searchParams: { agregarMapa, map, agregarMesa },
}: TablesEditPageProps) {
    const [showZoomControls, setShowZoomControls] = useState(false);
    const [selectedTableId, setSelectedTableId] = useState<string | null>(null);
    const [maps, setMaps] = useState<MapInterface[]>([]);
    const [mapTables, setMapTables] = useState<MapTableInterface[]>([]);
    const [restaurant, setRestaurant] = useState<RestaurantInterface | null>(
        null
    );
    const setLoading = useLoadStore((state) => state.setLoading);

    const handleDragEnd = ({
        tableId,
        x,
        y,
    }: {
        tableId: string;
        x: number;
        y: number;
    }) => {
        setMapTables((prevTables) =>
            prevTables.map((table) => {
                if (table.id === tableId) {
                    return {
                        ...table,
                        position_x: x,
                        position_y: y,
                    };
                }
                return table;
            })
        );
    };

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            return Promise.all([
                getByRestaurantLink(restaurantLink),
                getByLink(restaurantLink),
            ]);
        };
        const fetchData2 = async () => {
            return Promise.all([
                getByRestaurantLink(restaurantLink),
                getByLink(restaurantLink),
                getById(map as string),
            ]);
        };
        const fetchMapTables = async (id: string) => {
            return getByMap(id);
        };
        if (map) {
            fetchData2()
                .then((data) => {
                    setMaps(data[0]);
                    setRestaurant(data[1].rows[0]);
                    setMapTables(data[2]);
                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                    setLoading(false);
                });
        } else {
            fetchData()
                .then((data) => {
                    setMaps(data[0]);
                    setRestaurant(data[1].rows[0]);
                    if (data[0].length > 0) {
                        fetchMapTables(data[0][0].id).then((data2) => {
                            setMapTables(data2);
                            setLoading(false);
                        });
                    }
                })
                .catch((error) => {
                    console.log(error);
                    setLoading(false);
                });
        }
    }, [restaurantLink, map, agregarMapa]);
    const openAddMapDialog = Boolean(agregarMapa);
    const router = useRouter();

    const handleSave = async () => {
        await putTables(mapTables, maps[0].id);
    };

    const handleOpenAddTable = () => {
        router.push("./editar?agregarMesa=1");
    };

    const handleDeleteTable = () => {
        setMapTables(mapTables.filter((table) => table.id !== selectedTableId));
    };

    const handleAddTable = (id: string) => {
        const newTable: MapTableInterface = {
            id: (
                Math.max(
                    ...mapTables.map((table) => parseInt(table.id, 10)),
                    0
                ) + 1
            ).toString(),
            number: Math.max(...mapTables.map((table) => table.number), 0) + 1,
            map_id: maps[0].id,
            table_id: id,
            position_x: 0,
            position_y: 0,
            qr_code_id: "",
            qr_code: "",
        };
        setMapTables([...mapTables, newTable]);
        router.push("./editar");
    };

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
                    mode="edit"
                    showZoomControls={showZoomControls}
                    onSelectTable={setSelectedTableId}
                    selectedTable={selectedTableId}
                    maps={maps}
                    selectedMap={map}
                    showAddMap={true}
                    handleDragEnd={handleDragEnd}
                />
            </Box>
            <BottomNavigation
                showZoomControls={showZoomControls}
                setShowZoomControls={setShowZoomControls}
                isEditMode={true}
                selectedTableId={selectedTableId}
                onDeleteTable={handleDeleteTable}
                handleAddTable={handleOpenAddTable}
                handleSave={handleSave}
            />
            <AddMapDialog
                restaurant={restaurant?.id || ""}
                open={openAddMapDialog}
                handleClose={() => router.push("./editar")}
            />
            <AddTableDrawer
                open={Boolean(agregarMesa)}
                handleClose={() => router.push("./editar")}
                handleConfirm={handleAddTable}
            />
        </>
    );
}
