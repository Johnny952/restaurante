"use server";
import { sql } from "@vercel/postgres";

/**
 * Insert new language of restaurant in database
 * @param name - The language identifier
 * @param link - The language name
 * @returns
 */
export async function put(restaurant: string, language: string) {
    return sql`
    INSERT INTO Restaurant_Languages (restaurant_id, language_id)
    VALUES ((${restaurant}), (${language}))`;
}
