"use server";
import { sql } from "@vercel/postgres";

/**
 * Deletes a restaurant for the given id
 * @param restaurante - The resutaurant identifier
 */
export async function del(id: string) {
    await sql.query(`
        START TRANSACTION;

        DELETE FROM Dishes
        WHERE category_id IN (
            SELECT id
            FROM Categories
            WHERE restaurant_language_id IN (
                SELECT id
                FROM Restaurant_Languages
                WHERE restaurant_id = (${id})
            )
        );

        DELETE FROM Categories
        WHERE restaurant_language_id IN (
            SELECT id
            FROM Restaurant_Languages
            WHERE restaurant_id = (${id})
        );

        DELETE FROM Restaurant_Languages
        WHERE restaurant_id = (${id});

        DELETE FROM Restaurants
        WHERE id = (${id});

        COMMIT;
    `);
}
