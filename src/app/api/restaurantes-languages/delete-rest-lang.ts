"use server";
import { sql } from "@vercel/postgres";

/**
 * Deletes a language from restaurant for the given id
 * @param id - The restaurant language identifier
 */
export async function deleteRestLang(id: string) {
    await sql.query(`
        START TRANSACTION;

        DELETE FROM Dishes
        WHERE category_id IN (
          SELECT id
          FROM Categories
          WHERE rest_language_id = '${id}'
        );

        DELETE FROM Categories
        WHERE rest_language_id = '${id}';

        DELETE FROM Rest_Languages
        WHERE id = '${id}';

        COMMIT;
    `);
}
