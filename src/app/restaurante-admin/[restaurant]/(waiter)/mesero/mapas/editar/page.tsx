"use client";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import TableMap from "../../components/table-map";
import BottomNavigation from "../../components/bottom-navigation";
import { getByRestaurantLink, MapInterface } from "@/app/api/maps/get";
import { RestaurantInterface } from "@/app/api/restaurants/index.types";
import { getByLink } from "@/app/api/restaurants/get";
import { getByMap, MapTableInterface } from "@/app/api/maps-tables/get";
import AddMapDialog from "../../components/add-map-dialog";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import AddTableDrawer from "../../components/add-table";
import { putTables } from "@/app/api/maps-tables/put";
import useLoadStore from "@/store/load-store";
import { navigateWithNewParam } from "@/helpers/navigate-with-new-params";
import useSnackStore from "@/store/snackbar-store";
import { put } from "@/app/api/maps/put";
import DeleteMapDialog from "../../components/delete-map-dialog";
import { del as deleteMap } from "@/app/api/maps/delete";

interface TablesEditPageProps {
    params: {
        restaurant: string;
    };
    searchParams: {
        agregarMapa?: string;
        agregarMesa?: string;
        eliminarMapa?: string;
    };
}

export default function TablesEditPage({
    params: { restaurant: restaurantLink },
    searchParams: { agregarMapa, agregarMesa, eliminarMapa },
}: TablesEditPageProps) {
    const [showZoomControls, setShowZoomControls] = useState(false);
    const [selectedTableId, setSelectedTableId] = useState<string | null>(null);
    const [maps, setMaps] = useState<MapInterface[]>([]);
    const [mapTables, setMapTables] = useState<MapTableInterface[]>([]);
    const [restaurant, setRestaurant] = useState<RestaurantInterface | null>(
        null
    );

    const setLoading = useLoadStore((state) => state.setLoading);
    const snackError = useSnackStore((state) => state.setOpenError);
    const snackSuccess = useSnackStore((state) => state.setOpenSuccess);

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
        const fetchMapTables = async (id: string) => {
            return getByMap(id);
        };
        fetchData()
            .then((data) => {
                setMaps(data[0]);
                setRestaurant(data[1].rows[0]);
                if (data[0].length > 0) {
                    fetchMapTables(data[0][0].id).then((data2) => {
                        setMapTables(data2);
                        setLoading(false);
                    });
                } else {
                    setLoading(false);
                }
            })
            .catch((error) => {
                snackError(`Ocurrio un error: ${error}`);
                setLoading(false);
            });
    }, [restaurantLink, agregarMapa]);
    const openAddMapDialog = Boolean(agregarMapa);
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const handleSave = async () => {
        setLoading(true);
        try {
            await putTables(mapTables, maps[0].id);
            snackSuccess("Mesas actualizadas");
        } catch (error) {
            snackError(`Ocurrio un error: ${error}`);
        }
        setLoading(false);
    };

    const handleOpenAddTable = () => {
        navigateWithNewParam(router, searchParams, pathname, [
            {
                name: "agregarMesa",
                value: "1",
            },
        ]);
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
            position_x: Math.floor(maps[0].width / 2),
            position_y: Math.floor(maps[0].height) / 2,
            qr_code_id: "",
            qr_code: "",
        };
        setMapTables([...mapTables, newTable]);
        router.push("./editar");
    };

    const handleMapDelete = () => {
        navigateWithNewParam(router, searchParams, pathname, [
            {
                name: "eliminarMapa",
                value: "1",
            },
        ]);
    };

    const handleConfirmDeleteMap = async () => {
        setLoading(true);
        try {
            await deleteMap(maps[0].id);
            snackSuccess("Mapa eliminado");
            router.push("./editar");
        } catch (error) {
            snackError(`Ocurrio un error: ${error}`);
        }
        setLoading(false);
    };

    const handleAddMap = async (
        name: string,
        height: number,
        width: number,
        callback: () => void
    ) => {
        setLoading(true);
        try {
            await put(name, width, height, restaurant?.id || "");
            snackSuccess("Mapa creado");
            router.push("./editar");
            callback();
        } catch (error) {
            snackError(`Ocurrio un error: ${error}`);
        }
        setLoading(false);
    };

    const handleMapChange = (newValue: string) => {
        router.push(`editar/${newValue}`);
    };

    return (
        <>
            <Box sx={{ flex: 1, overflow: "hidden", position: "relative" }}>
                <TableMap
                    initialTables={mapTables || []}
                    initialMap={maps[0]}
                    mode="edit"
                    showZoomControls={showZoomControls}
                    onSelectTable={setSelectedTableId}
                    selectedTable={selectedTableId}
                    maps={maps}
                    selectedMap={maps[0] ? maps[0].id : undefined}
                    handleMapChange={handleMapChange}
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
                handleMapDelete={handleMapDelete}
                viewHref="ver"
            />
            <AddMapDialog
                open={openAddMapDialog}
                handleClose={() => router.push("./editar")}
                handleAddMap={handleAddMap}
            />
            <AddTableDrawer
                open={Boolean(agregarMesa)}
                handleClose={() => router.push("./editar")}
                handleConfirm={handleAddTable}
            />
            <DeleteMapDialog
                open={Boolean(eliminarMapa)}
                handleClose={() => router.push("./editar")}
                handleConfirmDeleteMap={handleConfirmDeleteMap}
            />
        </>
    );
}
