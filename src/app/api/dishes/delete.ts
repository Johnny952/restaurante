"use server";
import { sql } from "@vercel/postgres";

export async function del(id: string) {
    await sql.query(`
        DELETE FROM Dishes
        WHERE id = '${id}';
    `);
}
