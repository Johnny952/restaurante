"use server";
import { sql } from "@vercel/postgres";
import { LanguageInterface, LanguageTableInterface } from "./index.types";
import { TableParams } from "../helpers/index.types";
import baseQuery from "../helpers/base-query";

/**
 * Get available languages for the restaurant
 * @param restaurantLink - The restaurant link
 * @returns The list of languages
 */
export async function getByLink(restaurantLink: string) {
    return (
        await sql<LanguageInterface>`
        SELECT l.id as link, l.name as name
        FROM Restaurants r
        JOIN Restaurant_Languages rl ON r.id = rl.restaurant_id
        JOIN Languages l ON rl.language_id = l.id
        WHERE r.link = (${restaurantLink});
    `
    ).rows;
}

/**
 * Get all languages
 * @param param - Pagination, filter and sort parameters
 * @returns The languages
 */
export async function list({
    page = 0,
    size = 25,
    sortBy = "id",
    sortOrder = "ASC",
    filterField,
    filterOperator,
    filterValue,
}: TableParams) {
    const orderByDirection =
        sortOrder.toLowerCase() === "desc" ? "DESC" : "ASC";
    const res = (
        await sql.query(`
        SELECT id, name
        FROM Languages
        ${baseQuery(filterField, filterOperator, filterValue)}
        ORDER BY (${sortBy}) ${orderByDirection}
        LIMIT (${size}) OFFSET (${page * size})`)
    ).rows;
    return res as LanguageTableInterface[];
}

export async function getById(id: string) {
    const res = (
        await sql.query(`
        SELECT id, name
        FROM Languages
        WHERE id='${id}'
    `)
    ).rows[0];
    return res as LanguageTableInterface;
}

/**
 * Count languages with filters
 * @param filterField
 * @param filterOperator
 * @param filterValue
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
        FROM Languages
        ${baseQuery(filterField, filterOperator, filterValue)}
    `)
    ).rows[0] as { count: string };
}

export async function getAll() {
    return (
        await sql.query(`
        SELECT id, name
        FROM Languages
    `)
    ).rows as { id: string; name: string }[];
}

export async function getAllByRestaurant(restaurant: string) {
    return (
        await sql.query(`
        SELECT l.name as name, l.id as id
        FROM Restaurant_Languages rl
        JOIN Restaurants r ON rl.restaurant_id = r.id
        JOIN Languages l ON rl.language_id = l.id
        WHERE r.id = '${restaurant}'
`)
    ).rows as { id: string; name: string }[];
}
