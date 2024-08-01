"use server";
import { sql } from "@vercel/postgres";

interface MapInterface {
    id: string;
    table_id: string;
}

export async function del(id: string) {
    let query: string;
    const map = (
        await sql.query<MapInterface>(`
        SELECT m.id as id, mt.id as table_id
        FROM Maps m
        LEFT JOIN Maps_Tables mt ON mt.map_id = m.id
        WHERE m.id = '${id}';`)
    ).rows;
    if (map.length === 0) {
        throw new Error("Mapa no encontrado");
    }
    if (map.length === 1 && map[0].table_id === null) {
        // Map does not have tables
        query = `DELETE FROM Maps WHERE id = '${id}';`;
    } else {
        query = `UPDATE Maps SET deleted = true WHERE id = '${id}';`;
    }

    await sql.query(query);
}
