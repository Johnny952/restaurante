"use server";

import { sql } from "@vercel/postgres";

export interface MapTableInterface {
    id: number;
    number: number;
    map_id: number;
    table_id: number;
    position_x: number;
    position_y: number;
    qr_code_id: string;
    qr_code: string;
    deleted: boolean;
}

/**
 * Get map by id
 * @param id - The map id
 * @returns The map
 */

export async function getById(id: string) {
    return (
        await sql<MapTableInterface>`
        SELECT id, number, map_id, table_id, position_x, position_y, qr_code_id, qr_code, deleted
        FROM Maps_Tables mt
        WHERE map_id=${id}
    `
    ).rows;
}

/**
 * Get tables by map
 * @param restaurant - The restaurant
 * @param map - The map
 * @returns The list of tables
 */
export async function getByMap(map: number) {
    return (
        await sql<MapTableInterface>`
        SELECT id, number, map_id, table_id, position_x, position_y, qr_code_id, qr_code
        FROM Maps_Tables
        WHERE map_id = ${map}
    `
    ).rows;
}
