"use server";
import { sql } from "@vercel/postgres";

/**
 * Deletes a language for the given id
 * @param id - The language identifier
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
            WHERE language_id = '${id}'
          )
        );

        DELETE FROM Categories
        WHERE restaurant_language_id IN (
          SELECT id
          FROM Restaurant_Languages
          WHERE language_id = '${id}'
        );

        DELETE FROM Restaurant_Languages
        WHERE language_id = '${id}';

        DELETE FROM Languages
        WHERE id = '${id}';

        COMMIT;
    `);
}
