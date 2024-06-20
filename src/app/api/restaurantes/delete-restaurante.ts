"use server";
import { sql } from "@vercel/postgres";

/**
 * Deletes a restaurant for the given id
 * @param restaurante - The resutaurant identifier
 */
export async function deleteRestaurante(id: string) {
    await sql.query(`
        START TRANSACTION;

        DELETE FROM Dishes
        WHERE category_id IN (
        SELECT id
        FROM Categories
        WHERE rest_language_id IN (
            SELECT id
            FROM Rest_Languages
            WHERE restaurante_id = (${id})
        )
        );

        DELETE FROM Categories
        WHERE rest_language_id IN (
        SELECT id
        FROM Rest_Languages
        WHERE restaurante_id = (${id})
        );

        DELETE FROM Rest_Languages
        WHERE restaurante_id = (${id});

        DELETE FROM Restaurantes
        WHERE id = (${id});

        COMMIT;
    `);
}
