"use server";
import { sql } from "@vercel/postgres";
import { MapTableInterface } from "./get";

export async function putTables(tables: MapTableInterface[], mapId: string) {
    const values = tables
        .map(
            (table) =>
                `(${mapId}, ${table.table_id}, ${table.position_x}, ${table.position_y}, '${table.qr_code_id}', '${table.qr_code}')`
        )
        .join(", ");
    await sql.query(`
        START TRANSACTION;

        DELETE FROM Maps_Tables
        WHERE map_id = ${mapId};

        INSERT INTO Maps_Tables (map_id, table_id, position_x, position_y, qr_code_id, qr_code)
        VALUES ${values};
        COMMIT;
        `);
}
