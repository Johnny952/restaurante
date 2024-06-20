"use server";
import { sql } from "@vercel/postgres";

/**
 * Insert new language in database
 * @param name - The language identifier
 * @param link - The language name
 * @returns
 */
export async function putLanguage(id: string, name: string) {
    return sql`
    INSERT INTO Languages (id, name)
    VALUES ((${id}), (${name}))`;
}
