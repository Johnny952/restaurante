"use server";
import { sql } from "@vercel/postgres";

/**
 * Updates restaurant name and link
 * @param id - The restaurant id
 * @param name - The restaurant new name
 * @param link - The restaurant new liink
 * @returns 
 */
export async function updateRestauranteName(id: string, name: string, link: string) {
    return sql`
    UPDATE Restaurantes
    SET name=(${name}), link=(${link})
    WHERE id=(${id})`;
}

/**
 * Updates restaurant logo
 * @param id - The restaurant id
 * @param logo - The restaurant logo link
 * @returns
 */
export async function updateRestauranteLogo(id: string, logo: string) {
    return sql`
    UPDATE Restaurantes
    SET image=(${logo})
    WHERE id=(${id})`;
}
