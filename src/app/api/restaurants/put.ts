"use server";
import { sql } from "@vercel/postgres";

/**
 * Insert new restaurant in database
 * @param name - The restaurant name
 * @param link - The restaurant link
 * @param logo - The restaurant logo image
 * @returns
 */
export async function put(
    name: string,
    link: string,
    logo: string,
    background: string | undefined | null
) {
    if (background) {
        return sql`
            INSERT INTO Restaurants (name, link, image, background)
            VALUES ((${name}), (${link}), (${logo}), (${background}))
        `;
    }
    return sql`
        INSERT INTO Restaurants (name, link, image, background)
        VALUES ((${name}), (${link}), (${logo}), NULL)
    `;
}
