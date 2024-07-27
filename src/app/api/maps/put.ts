"use server";
import { sql } from "@vercel/postgres";

/**
 * Insert new map in database
 * @param name - The map name
 * @param restaurant - The restaurant
 * @returns
 */
export async function put(
    name: string,
    width: number,
    height: number,
    restaurant: string
) {
    return sql`
    INSERT INTO Maps (name, restaurant_id, width, height)
    VALUES (${name}, ${restaurant}, ${width}, ${height})`;
}
