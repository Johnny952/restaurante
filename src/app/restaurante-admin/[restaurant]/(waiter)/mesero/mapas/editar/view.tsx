"use client";

import { Box } from "@mui/material";
import TableMap from "../../components/table-map";
import BottomNavigation from "../../components/bottom-navigation";
import AddMapDialog from "../../components/add-map-dialog";
import AddTableDrawer from "../../components/add-table";
import DeleteMapDialog from "../../components/delete-map-dialog";
import { useEffect, useState } from "react";
import { put as putMap } from "@/app/api/maps/put";
import { usePathname, useRouter } from "next/navigation";
import { MapTableInterface } from "@/app/api/maps-tables/get";
import { MapInterface } from "@/app/api/maps/get";
import Loader from "../../components/loader";
import { putAndUpdateTables } from "@/app/api/maps-tables/put";
import { del as deleteMap } from "@/app/api/maps/delete";

interface Props {
    mapTables?: MapTableInterface[];
    maps: MapInterface[];
    restaurantLink: string;
    openAddMapDialog: boolean;
    openAddTable: boolean;
    openDeleteMap: boolean;
    currentMap?: MapInterface;
    selectedMap?: boolean;
    viewHref?: string;
}

export default function View({
    mapTables,
    maps,
    restaurantLink,
    openAddMapDialog,
    openAddTable,
    openDeleteMap,
    currentMap,
    selectedMap = true,
    viewHref = `../ver/${currentMap?.id}`,
}: Props) {
    const [isLoading, setIsLoading] = useState(true);
    const [selectedTableId, setSelectedTableId] = useState<string | null>(null);
    const [showZoomControls, setShowZoomControls] = useState(false);
    const [serverTables, setServerTables] = useState<MapTableInterface[]>([]);
    const [localTables, setLocalTables] = useState<MapTableInterface[]>([]);

    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        setServerTables(mapTables || []);
        // Ocultar el loader cuando el componente se monte
        const timer = setTimeout(() => setIsLoading(false), 100);
        return () => clearTimeout(timer);
    }, [mapTables]);

    const handleDragEnd = ({
        tableId,
        x,
        y,
    }: {
        tableId: string;
        x: number;
        y: number;
    }) => {
        const isServerTable = serverTables.some(
            (map) => map.id.toString() === tableId
        );
        const isLocalTable = localTables.some(
            (map) => map.id.toString() === tableId
        );

        const mapSetter = isServerTable
            ? setServerTables
            : isLocalTable
              ? setLocalTables
              : undefined;

        if (mapSetter) {
            mapSetter((prevTables) =>
                prevTables.map((table) => {
                    if (table.id.toString() === tableId) {
                        return {
                            ...table,
                            position_x: x,
                            position_y: y,
                        };
                    }
                    return table;
                })
            );
        }
    };

    const handleSave = async () => {
        setIsLoading(true);
        try {
            if (!currentMap) {
                throw Error("Mapa no encontrado");
            }
            await putAndUpdateTables(localTables, serverTables, currentMap?.id);
        } catch (error) {
            console.log(`Ocurrio un error: ${error}`);
        }
        setIsLoading(false);
    };

    const handleMapChange = (newValue: string) => {
        const url = selectedMap ? newValue.toString() : `editar/${newValue}`;
        router.push(url);
    };

    const handleAddMap = async (
        name: string,
        height: number,
        width: number,
        callback: () => void
    ) => {
        setIsLoading(true);
        try {
            await putMap(name, width, height, restaurantLink);
            router.push("./editar");
            callback();
        } catch (error) {
            console.log(`Ocurrio un error: ${error}`);
        }
        setIsLoading(false);
    };

    const handleConfirmDeleteMap = async () => {
        setIsLoading(true);
        try {
            if (!currentMap) {
                throw Error("Mapa no encontrado");
            }
            await deleteMap(currentMap?.id.toString());
            if (selectedMap) {
                router.push("../editar");
            } else {
                router.push(pathname);
            }
        } catch (error) {
            console.log(`Ocurrio un error: ${error}`);
        }
        setIsLoading(false);
    };

    const handleDeleteTable = () => {
        const isServerTable = serverTables.some(
            (map) => map.id.toString() === selectedTableId
        );
        const isLocalTable = localTables.some(
            (map) => map.id.toString() === selectedTableId
        );

        if (isLocalTable) {
            setLocalTables(
                localTables.filter(
                    (table) => table.id.toString() !== selectedTableId
                )
            );
            return;
        }
        if (isServerTable) {
            setServerTables(
                serverTables.map((tab) => {
                    if (tab.id.toString() === selectedTableId) {
                        return {
                            ...tab,
                            deleted: true,
                        };
                    }
                    return tab;
                })
            );
        }
    };

    const handleAddTable = (id: string) => {
        if (!currentMap) return;
        const newTable: MapTableInterface = {
            id: Math.max(...localTables.map((table) => table.id), 0) + 1,
            number:
                Math.max(...localTables.map((table) => table.number), 0) + 1,
            map_id: currentMap.id,
            table_id: parseInt(id, 10),
            position_x: Math.floor(currentMap.width / 2),
            position_y: Math.floor(currentMap.height) / 2,
            qr_code_id: "",
            qr_code: "",
            deleted: false,
        };
        setLocalTables([...localTables, newTable]);
        router.push(pathname);
    };

    const handleOpenAddTable = () => {
        router.push(`${pathname}?agregarMesa=1`);
    };

    const handleMapDelete = () => {
        router.push(`${pathname}?eliminarMapa=1`);
    };
    const handleOpenAddMap = () => {
        router.push(`${pathname}?agregarMapa=1`);
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
                            initialTables={
                                serverTables.concat(localTables) || []
                            }
                            initialMap={currentMap}
                            mode="edit"
                            showZoomControls={showZoomControls}
                            onSelectTable={setSelectedTableId}
                            selectedTable={selectedTableId}
                            maps={maps}
                            selectedMap={currentMap?.id.toString()}
                            handleMapChange={handleMapChange}
                            showAddMap={true}
                            handleDragEnd={handleDragEnd}
                            handleAddMap={handleOpenAddMap}
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
                        viewHref={
                            currentMap?.deleted
                                ? selectedMap
                                    ? "../ver"
                                    : "ver"
                                : viewHref
                        }
                    />
                    <AddMapDialog
                        open={openAddMapDialog}
                        handleClose={() => router.push(pathname)}
                        handleAddMap={handleAddMap}
                    />
                    <AddTableDrawer
                        open={openAddTable}
                        handleClose={() => router.push(pathname)}
                        handleConfirm={handleAddTable}
                    />
                    <DeleteMapDialog
                        open={openDeleteMap}
                        handleClose={() => router.push(pathname)}
                        handleConfirmDeleteMap={handleConfirmDeleteMap}
                    />
                </>
            )}
        </>
    );
}
