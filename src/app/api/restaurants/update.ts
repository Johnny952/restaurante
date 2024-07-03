"use server";
import { sql } from "@vercel/postgres";

/**
 * Updates restaurant name and link
 * @param id - The restaurant id
 * @param name - The restaurant new name
 * @param link - The restaurant new liink
 * @returns
 */
export async function updateName(id: string, name: string, link: string) {
    return sql`
    UPDATE Restaurants
    SET name=(${name}), link=(${link})
    WHERE id=(${id})`;
}

/**
 * Updates restaurant logo
 * @param id - The restaurant id
 * @param logo - The restaurant logo link
 * @returns
 */
export async function updateLogo(id: string, logo: string) {
    return sql`
    UPDATE Restaurants
    SET image=(${logo})
    WHERE id=(${id})`;
}

export async function updateBackground(
    id: string,
    background: string | undefined | null
) {
    if (background) {
        return sql`
        UPDATE Restaurants
        SET background=(${background})
        WHERE id=(${id})`;
    }
    return sql`
    UPDATE Restaurants
    SET background=NULL
    WHERE id=(${id})`;
}
