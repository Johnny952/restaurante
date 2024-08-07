"use server";

import { sql } from "@vercel/postgres";

/**
 * Interface for maps
 */
export interface MapInterface {
    id: number;
    name: string;
    width: number;
    height: number;
    deleted: boolean;
}

/**
 * Get maps by restaurant
 * @param restaurantLink - The restaurant link
 * @returns The list of maps
 */
export async function getByRestaurantLink(
    restaurantLink: string,
    ignoreDeleted: boolean = false
) {
    const ignoreQuery = ignoreDeleted ? "AND m.deleted = false" : "";
    return (
        await sql.query<MapInterface>(`
            SELECT m.id, m.name, m.width, m.height, m.deleted
            FROM Maps m
            JOIN Restaurants r ON r.id = m.restaurant_id
            WHERE r.link = '${restaurantLink}' ${ignoreQuery}
        `)
    ).rows;
}
