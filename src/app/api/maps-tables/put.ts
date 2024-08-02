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

export async function putAndUpdateTables(
    localTables: MapTableInterface[],
    serverTables: MapTableInterface[],
    mapId: number
) {
    let numberCount = 0;
    const updateQuery = serverTables
        .map((table) => {
            if (!table.deleted) numberCount += 1;
            return `
            UPDATE Maps_Tables
            SET position_x = ${table.position_x}, position_y = ${table.position_y}, deleted = ${table.deleted}, table_id = ${table.table_id}, number = ${numberCount}
            WHERE map_id = ${mapId} AND table_id = ${table.table_id};
        `;
        })
        .join(" ");

    const insertQuery = localTables
        .map((table) => {
            numberCount += 1;
            return `(${mapId}, ${table.table_id}, ${table.position_x}, ${table.position_y}, '${table.qr_code_id}', '${table.qr_code}', ${numberCount})`;
        })
        .join(", ");

    await sql.query(`
        START TRANSACTION;
        
        ${updateQuery}

        INSERT INTO Maps_Tables (map_id, table_id, position_x, position_y, qr_code_id, qr_code, number)
        VALUES ${insertQuery};
        COMMIT;
    `);
}
