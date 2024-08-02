import React from "react";
import { getByRestaurantLink } from "@/app/api/maps/get";
import { getByMap } from "@/app/api/maps-tables/get";
import View from "./view";

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

async function fetData(restaurantLink: string) {
    const maps = await getByRestaurantLink(restaurantLink);
    let tables;
    if (maps.length > 0) {
        tables = await getByMap(maps[0].id);
    }
    return {
        maps,
        tables,
    };
}

export default async function TablesEditPage({
    params: { restaurant: restaurantLink },
    searchParams: { agregarMapa, agregarMesa, eliminarMapa },
}: TablesEditPageProps) {
    const { maps, tables: mapTables } = await fetData(restaurantLink);

    return (
        <View
            mapTables={mapTables}
            maps={maps}
            restaurantLink={restaurantLink}
            openAddMapDialog={Boolean(agregarMapa)}
            openAddTable={Boolean(agregarMesa)}
            openDeleteMap={Boolean(eliminarMapa)}
            currentMap={maps[0]}
            selectedMap={false}
            viewHref="ver"
        />
    );
}
