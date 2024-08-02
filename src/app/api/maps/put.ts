"use server";
import { sql } from "@vercel/postgres";

/**
 * Insert new map in database
 * @param name - The map name
 * @param restaurantLink - The restaurant link
 * @returns
 */
export async function put(
    name: string,
    width: number,
    height: number,
    restaurantLink: string
) {
    return sql`
    INSERT INTO Maps (name, width, height, deleted, restaurant_id)
    VALUES (${name}, ${width}, ${height}, false, (
        SELECT id
        FROM Restaurants
        WHERE link = ${restaurantLink}
    ))`;
}
