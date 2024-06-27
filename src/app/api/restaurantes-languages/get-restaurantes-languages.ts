"use server";
import { sql } from "@vercel/postgres";
import { TableParams } from "../helpers/index.types";
import baseQuery from "../helpers/base-query";
import { RestauranteLanguageInterface } from "./index.types";

export async function getRestLang(id: string) {
    const res = (
        await sql.query(`
            SELECT rl.id as id, r.name as rest_name, l.name as lang_name
            FROM Rest_Languages rl
            JOIN Restaurantes r ON rl.restaurante_id = r.id
            JOIN Languages l ON rl.language_id = l.id
            WHERE rl.id = '${id}'
    `)
    ).rows;
    return res[0] as RestauranteLanguageInterface;
}

const fieldMap = {
    id: "rl.id",
    rest_name: "r.name",
    lang_name: "l.name",
};

export async function listRestLangs({
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
        SELECT rl.id as id, r.name as rest_name, l.name as lang_name
        FROM Rest_Languages rl
        JOIN Restaurantes r ON rl.restaurante_id = r.id
        JOIN Languages l ON rl.language_id = l.id
        ${baseQuery(fieldMap[filterField as keyof typeof fieldMap], filterOperator, filterValue)}
        ORDER BY(${sortBy}) ${orderByDirection}
LIMIT(${size}) OFFSET(${page * size})`)
    ).rows;
    return res as RestauranteLanguageInterface[];
}

export async function getCountRestLangs(
    filterField?: string,
    filterOperator?: string,
    filterValue?: string
) {
    return (
        await sql.query(`
        SELECT COUNT(rl.id)
        FROM Rest_Languages rl
        JOIN Restaurantes r ON rl.restaurante_id = r.id
        JOIN Languages l ON rl.language_id = l.id
        ${baseQuery(fieldMap[filterField as keyof typeof fieldMap], filterOperator, filterValue)}
`)
    ).rows[0] as { count: string };
}

export async function getAll() {
    return (
        await sql.query(`
        SELECT rl.id as id, r.name as rest_name, l.name as lang_name
        FROM Rest_Languages rl
        JOIN Restaurantes r ON rl.restaurante_id = r.id
        JOIN Languages l ON rl.language_id = l.id
`)
    ).rows as RestauranteLanguageInterface[];
}

export async function getAllLanguages(restaurant: string) {
    return (
        await sql.query(`
        SELECT l.name as name, l.id as id
        FROM Rest_Languages rl
        JOIN Restaurantes r ON rl.restaurante_id = r.id
        JOIN Languages l ON rl.language_id = l.id
        WHERE r.id = '${restaurant}'
`)
    ).rows as { id: string; name: string }[];
}
