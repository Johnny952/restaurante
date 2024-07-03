"use server";
import { sql } from "@vercel/postgres";
import { CategoryAPI, CategoryTable } from "./index.types";
import { TableParams } from "../helpers/index.types";
import baseQuery from "../helpers/base-query";

/**
 * Get category information
 * @param restaurant - The restaurant link
 * @param language - The language
 * @param categoryLink - The category link
 * @returns The category information
 */
export async function getByLink(
    restaurantLink: string,
    language: string,
    categoryLink: string
) {
    return sql<CategoryAPI>`
        SELECT c.name as name, c.link as link, c.image as image
        FROM Restaurants r
        JOIN Restaurant_Languages rl ON r.id = rl.restaurant_id
        JOIN Categories c ON rl.id = c.restaurant_language_id
        WHERE r.link = (${restaurantLink})
        AND rl.language_id = (${language})
        AND c.link=(${categoryLink});
    `;
}

export async function getALlParentsByLink(
    restaurantLink: string,
    language: string
) {
    return (
        await sql<CategoryAPI>`
        SELECT child.name as name, child.link as link, child.image as image
        FROM Restaurants r
        JOIN Restaurant_Languages rl ON r.id = rl.restaurant_id
        JOIN Categories child ON rl.id = child.restaurant_language_id
        WHERE r.link = (${restaurantLink})
        AND rl.language_id = (${language})
        AND child.parent_id IS NULL;
    `
    ).rows;
}

export async function getALlChildrenByLink(
    restaurantLink: string,
    language: string,
    parentLink: string
) {
    return (
        await sql<CategoryAPI>`
        SELECT child.name as name, child.link as link, child.image as image
        FROM Restaurants r
        JOIN Restaurant_Languages rl ON r.id = rl.restaurant_id
        JOIN Categories child ON rl.id = child.restaurant_language_id
        LEFT JOIN Categories parent ON child.parent_id = parent.id
        WHERE r.link = (${restaurantLink})
        AND rl.language_id = (${language})
        AND parent.link = (${parentLink});
    `
    ).rows;
}

export async function getById(id: string) {
    const res = (
        await sql.query(`
            SELECT c.id as id, c.name as name, rl.id as restlang, r.name as restaurant_name, r.link as restaurant_link, rl.language_id as language, c.link as link, par_c.name as parent, c.image as image
            FROM Categories c
            JOIN Restaurant_Languages rl ON c.restaurant_language_id = rl.id
            JOIN Restaurants r ON rl.restaurant_id = r.id
            LEFT JOIN Categories par_c ON c.parent_id = par_c.id
            WHERE c.id = '${id}'
        `)
    ).rows;
    return res[0] as
        | (CategoryTable & { restlang: string; restaurant_link: string })
        | undefined;
}

const fieldMap = {
    id: "c.id",
    name: "c.name",
    restaurant_name: "r.name",
    language: "rl.language_id",
    link: "c.link",
    parent: "par_c.name",
    image: "c.image",
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
        SELECT c.id as id, c.name as name, r.name as restaurant_name, rl.language_id as language, c.link as link, par_c.name as parent, c.image as image
        FROM Categories c
        JOIN Restaurant_Languages rl ON c.restaurant_language_id = rl.id
        JOIN Restaurants r ON rl.restaurant_id = r.id
        LEFT JOIN Categories par_c ON c.parent_id = par_c.id
        ${baseQuery(fieldMap[filterField as keyof typeof fieldMap], filterOperator, filterValue)}
        ORDER BY (${sortBy}) ${orderByDirection}
        LIMIT (${size}) OFFSET (${page * size})
        `)
    ).rows;
    return res as CategoryTable[];
}

export async function getCount(
    filterField?: string,
    filterOperator?: string,
    filterValue?: string
) {
    return (
        await sql.query(`
        SELECT COUNT(c.id)
        FROM Categories c
        JOIN Restaurant_Languages rl ON c.restaurant_language_id = rl.id
        JOIN Restaurants r ON rl.restaurant_id = r.id
        LEFT JOIN Categories par_c ON c.parent_id = par_c.id
        ${baseQuery(fieldMap[filterField as keyof typeof fieldMap], filterOperator, filterValue)}
    `)
    ).rows[0] as { count: string };
}

export async function getAllParentsByRestLang(
    restaurant: string,
    language: string
) {
    return (
        await sql.query(`
        SELECT child.id, child.name
        FROM Categories child
        JOIN Restaurant_Languages rl ON child.restaurant_language_id = rl.id
        WHERE rl.restaurant_id = '${restaurant}' AND rl.language_id = '${language}' AND child.parent_id IS NULL;
    `)
    ).rows as { id: string; name: string }[];
}

export async function getAllParents(restaurantLanguage: string, catId: string) {
    return (
        await sql.query(`
        SELECT c.id, c.name
        FROM Categories c
        JOIN Restaurant_Languages rl ON c.restaurant_language_id = rl.id
        WHERE rl.id = '${restaurantLanguage}' AND c.parent_id IS NULL AND c.id != '${catId}';
    `)
    ).rows as { id: string; name: string }[];
}

export async function getAllAvailableToDishByRestLang(
    restaurant: string,
    language: string
) {
    return (
        await sql.query(`
            SELECT parent.id, parent.name
            FROM Categories parent
            LEFT JOIN Categories child ON parent.id = child.parent_id
            JOIN Restaurant_Languages rl ON parent.restaurant_language_id = rl.id
            WHERE rl.restaurant_id = '${restaurant}' AND rl.language_id = '${language}' AND child.id IS NULL
            ORDER BY parent.name;
    `)
    ).rows as { id: string; name: string }[];
}
