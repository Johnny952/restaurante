"use server";
import { sql } from "@vercel/postgres";

/**
 * Insert new restaurant in database
 * @param name - The restaurant name
 * @param link - The restaurant link
 * @param logo - The restaurant logo image
 * @returns
 */
export async function putRestaurante(name: string, link: string, logo: string) {
    return sql`
    INSERT INTO Restaurantes (name, link, image)
    VALUES ((${name}), (${link}), (${logo}))`;
}
