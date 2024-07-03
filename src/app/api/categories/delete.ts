"use server";
import { sql } from "@vercel/postgres";

export async function del(id: string) {
    await sql.query(`
        START TRANSACTION;

        DELETE FROM Dishes
        WHERE category_id IN (
          SELECT id
          FROM Categories
          WHERE id = '${id}'
        );

        DELETE FROM Dishes
        WHERE category_id IN (
          SELECT id
          FROM Categories
          WHERE parent_id IN (
            SELECT id
            FROM Categories
            WHERE id = '${id}'
          )
        );

        DELETE FROM Categories
        WHERE parent_id IN (
          SELECT id
          FROM Categories
          WHERE id = '${id}'
        );

        DELETE FROM Categories
        WHERE id = '${id}';
        COMMIT;
    `);
}
