import React from "react";
import { getByRestaurantLink } from "@/app/api/maps/get";
import { getByMap } from "@/app/api/maps-tables/get";
import View from "./view";

interface TablesViewPageProps {
    params: {
        restaurant: string;
    };
}

async function fetData(restaurantLink: string) {
    let tables;
    const maps = await getByRestaurantLink(restaurantLink, true);
    if (maps.length > 0) {
        tables = await getByMap(maps[0].id);
    }
    return {
        maps,
        tables,
    };
}

export default async function TablesViewPage({
    params: { restaurant: restaurantLink },
}: TablesViewPageProps) {
    const { maps, tables: mapTables } = await fetData(restaurantLink);

    return (
        <View
            maps={maps}
            mapTables={mapTables}
            currentMap={maps[0]}
            editHref="editar"
        />
    );
}
