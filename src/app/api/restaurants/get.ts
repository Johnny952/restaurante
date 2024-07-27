"use server";
import { sql } from "@vercel/postgres";
import { RestaurantInterface } from "./index.types";
import baseQuery from "../helpers/base-query";
import { TableParams } from "../helpers/index.types";

/**
 * Get restaurant information
 * @param link - The restaurant link
 * @returns restaurant information
 */
export async function getByLink(link: string) {
    return sql<RestaurantInterface>`
        SELECT id, name, link, image, background
        FROM Restaurants
        WHERE link=(${link})
    `;
}

export async function getBackground(link: string) {
    return (
        await sql<{ background: string; image: string; name: string }>`
        SELECT background, image, name
        FROM Restaurants
        WHERE link=(${link})
    `
    ).rows;
}

/**
 * Get restaurant information
 * @param id - The restaurant identifier
 * @returns restaurant information
 */
export async function getByID(id: string) {
    const res = await sql<RestaurantInterface>`
        SELECT name, link, image, background
        FROM Restaurants
        WHERE id=(${id})
    `;
    return res.rows[0];
}

/**
 * List restaurants with pagination, sorting and filtering
 * @param param - Pagination, sorting and filtering parameters
 * @returns restaurant list
 */
export async function list({
    page = 0,
    size = 25,
    sortBy = "name",
    sortOrder = "ASC",
    filterField,
    filterOperator,
    filterValue,
}: TableParams) {
    const orderByDirection =
        sortOrder.toLowerCase() === "desc" ? "DESC" : "ASC";
    const res = (
        await sql.query(`
        SELECT id, name, image, link, background
        FROM Restaurants
        ${baseQuery(filterField, filterOperator, filterValue)}
        ORDER BY (${sortBy}) ${orderByDirection}
        LIMIT (${size}) OFFSET (${page * size})`)
    ).rows;
    return res as RestaurantInterface[];
}

/**
 * Get total number of restaurants
 * @returns
 */
export async function getCount(
    filterField?: string,
    filterOperator?: string,
    filterValue?: string
) {
    return (
        await sql.query(`
        SELECT COUNT(id)
        FROM Restaurants
        ${baseQuery(filterField, filterOperator, filterValue)}
    `)
    ).rows[0] as { count: string };
}

export async function getAll() {
    const res = (
        await sql.query(`
            SELECT id, name, link
            FROM Restaurants
        `)
    ).rows;
    return res as { id: string; name: string; link: string }[];
}
