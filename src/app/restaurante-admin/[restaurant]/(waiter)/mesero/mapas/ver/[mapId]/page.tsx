import React from "react";
// import { getByRestaurantLink } from "@/app/api/maps/get";
// import { getById } from "@/app/api/maps-tables/get";
import View from "../view";
import { MapType } from "@/lib/models/map";
import { TableType } from "@/lib/models/tables";
import { MapTableType } from "@/lib/models/map-tables";

interface TablesViewPageProps {
    params: {
        restaurant: string;
        mapId: string;
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

export default async function TablesViewPage({
    params: { restaurant: restaurantLink, mapId },
}: TablesViewPageProps) {
    const {
        currentMap,
        maps,
        tables: mapTables,
    } = await fetData(restaurantLink, mapId);

    return (
        <View
            mapTables={mapTables}
            maps={maps}
            currentMap={currentMap}
            selectedMap={true}
        />
    );
}
