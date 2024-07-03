"use server";
import { sql } from "@vercel/postgres";

/**
 * Updates language name
 * @param id - The language id
 * @param name - The language new name
 * @returns
 */
export async function updateName(id: string, name: string) {
    return sql`
    UPDATE Languages
    SET name=(${name})
    WHERE id=(${id})`;
}

/**
 * Updates language id
 * @param id - The language id
 * @param logo - The language new id
 * @returns
 */
export async function updateID(id: string, newId: string) {
    return sql`
    UPDATE Languages
    SET id=(${newId})
    WHERE id=(${id})`;
}
