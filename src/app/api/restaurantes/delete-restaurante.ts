"use server";
import { sql } from "@vercel/postgres";

/**
 * Deletes a restaurant for the given link
 * @param restaurante - The resutaurant link
 */
export async function deleteRestaurante(restaurante: string | number | null) {
    await sql.query(`
        DELETE FROM Restaurantes
        WHERE link='${restaurante?.toString()}'
    `);
}
