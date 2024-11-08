import React from "react";
// import { getByRestaurantLink } from "@/app/api/maps/get";
// import { getById } from "@/app/api/maps-tables/get";
import View from "../view";
import { MapType } from "@/lib/models/map";
import { MapTableType } from "@/lib/models/map-tables";

interface TablesEditPageProps {
    params: {
        restaurant: string;
        mapId: string;
    };
    searchParams: {
        agregarMapa?: string;
        agregarMesa?: string;
        eliminarMapa?: string;
    };
}

async function fetData(restaurantLink: string, mapId: string) {
    // const data = await Promise.all([
    //     getByRestaurantLink(restaurantLink),
    //     getById(mapId),
    // ]);
    const maps: MapType[] = []//data[0];
    const tables: MapTableType[] = []//data[1];
    const currentMap = maps.find((m) => m.id.toString() === mapId);
    return {
        maps,
        tables,
        currentMap,
    };
}

export default async function TablesEditPage({
    params: { restaurant: restaurantLink, mapId },
    searchParams: { agregarMapa, agregarMesa, eliminarMapa },
}: TablesEditPageProps) {
    const {
        currentMap,
        maps,
        tables: mapTables,
    } = await fetData(restaurantLink, mapId);

    return (
        <View
            mapTables={mapTables}
            maps={maps}
            restaurantLink={restaurantLink}
            openAddMapDialog={Boolean(agregarMapa)}
            openAddTable={Boolean(agregarMesa)}
            openDeleteMap={Boolean(eliminarMapa)}
            currentMap={currentMap}
        />
    );
}
