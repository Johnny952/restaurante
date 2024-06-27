"use server";
import { sql } from "@vercel/postgres";

export async function deleteDish(id: string) {
    await sql.query(`
        DELETE FROM Dishes
        WHERE id = '${id}';
    `);
}
