import React from "react";
import { getByRestaurantLink } from "@/app/api/maps/get";
import { getById } from "@/app/api/maps-tables/get";
import View from "../view";

interface TablesViewPageProps {
    params: {
        restaurant: string;
        mapId: string;
    };
}

async function fetData(restaurantLink: string, mapId: string) {
    const data = await Promise.all([
        getByRestaurantLink(restaurantLink),
        getById(mapId),
    ]);
    const maps = data[0];
    const tables = data[1];
    const currentMap = data[0].find((m) => m.id.toString() === mapId);
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
