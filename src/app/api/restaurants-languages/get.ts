"use server";
import { sql } from "@vercel/postgres";
import { TableParams } from "../helpers/index.types";
import baseQuery from "../helpers/base-query";
import { RestaurantLanguageInterface } from "./index.types";

export async function get(id: string) {
    const res = (
        await sql.query(`
            SELECT rl.id as id, r.name as restaurant_name, l.name as language_name
            FROM Restaurant_Languages rl
            JOIN Restaurants r ON rl.restaurant_id = r.id
            JOIN Languages l ON rl.language_id = l.id
            WHERE rl.id = '${id}'
    `)
    ).rows;
    return res[0] as RestaurantLanguageInterface;
}

const fieldMap = {
    id: "rl.id",
    restaurant_name: "r.name",
    language_name: "l.name",
};

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
        SELECT rl.id as id, r.name as restaurant_name, l.name as language_name
        FROM Restaurant_Languages rl
        JOIN Restaurants r ON rl.restaurant_id = r.id
        JOIN Languages l ON rl.language_id = l.id
        ${baseQuery(fieldMap[filterField as keyof typeof fieldMap], filterOperator, filterValue)}
        ORDER BY(${sortBy}) ${orderByDirection}
LIMIT(${size}) OFFSET(${page * size})`)
    ).rows;
    return res as RestaurantLanguageInterface[];
}

export async function getCount(
    filterField?: string,
    filterOperator?: string,
    filterValue?: string
) {
    return (
        await sql.query(`
        SELECT COUNT(rl.id)
        FROM Restaurant_Languages rl
        JOIN Restaurants r ON rl.restaurant_id = r.id
        JOIN Languages l ON rl.language_id = l.id
        ${baseQuery(fieldMap[filterField as keyof typeof fieldMap], filterOperator, filterValue)}
`)
    ).rows[0] as { count: string };
}

export async function getAll() {
    return (
        await sql.query(`
        SELECT rl.id as id, r.name as restaurant_name, l.name as language_name
        FROM Restaurant_Languages rl
        JOIN Restaurants r ON rl.restaurant_id = r.id
        JOIN Languages l ON rl.language_id = l.id
`)
    ).rows as RestaurantLanguageInterface[];
}
