"use server";

import { sql } from "@vercel/postgres";

export interface MapTableInterface {
    id: string;
    number: number;
    map_id: string;
    table_id: string;
    position_x: number;
    position_y: number;
    qr_code_id: string;
    qr_code: string;
}

/**
 * Get map by id
 * @param id - The map id
 * @returns The map
 */

export async function getById(id: string) {
    return (
        await sql<MapTableInterface>`
        SELECT id, number, map_id, table_id, position_x, position_y, qr_code_id, qr_code
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
export async function getByMap(map: string) {
    return (
        await sql<MapTableInterface>`
        SELECT id, number, map_id, table_id, position_x, position_y, qr_code_id, qr_code
        FROM Maps_Tables
        WHERE map_id = ${map}
    `
    ).rows;
}
