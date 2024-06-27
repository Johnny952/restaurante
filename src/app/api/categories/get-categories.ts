"use server";
import { sql } from "@vercel/postgres";
import { CategoryAPI, CategoryTable } from "./index.types";
import { TableParams } from "../helpers/index.types";
import baseQuery from "../helpers/base-query";

/**
 * Get main background
 * @param restauranteLink - The restaurante name
 * @returns The root background
 */
export async function getRoot(restauranteLink: string) {
    return sql<{ image: string }>`
    SELECT c.image as image
    FROM Restaurantes r
    JOIN Rest_Languages rl ON r.id = rl.restaurante_id
    JOIN Categories c ON rl.id = c.rest_language_id
    WHERE r.link = (${restauranteLink}) AND c.name='root';
    `;
}

/**
 * Get category information
 * @param restaurante - The restaurante link
 * @param language - The language
 * @param categoryLink - The category link
 * @returns The category information
 */
export async function getCategory(
    restauranteLink: string,
    language: string,
    categoryLink: string
) {
    return sql<CategoryAPI>`
        SELECT c.name as name, c.link as link, c.image as image
        FROM Restaurantes r
        JOIN Rest_Languages rl ON r.id = rl.restaurante_id
        JOIN Categories c ON rl.id = c.rest_language_id
        WHERE r.link = (${restauranteLink})
        AND rl.language_id = (${language})
        AND c.link=(${categoryLink});
    `;
}

/**
 * Get subcategories for the given category
 * @param restauranteLink - The restaurante link
 * @param language - The language
 * @param parent - The category father
 * @returns List of categories
 */
export async function getCategoriesByParentLink(
    restauranteLink: string,
    language: string,
    parent: string
) {
    return sql<CategoryAPI>`
        SELECT c.name as name, c.link as link, c.image as image
        FROM Restaurantes r
        JOIN Rest_Languages rl ON r.id = rl.restaurante_id
        JOIN Categories c ON rl.id = c.rest_language_id
        LEFT JOIN Categories par_c ON c.parent_id = par_c.id
        WHERE r.link = (${restauranteLink})
        AND rl.language_id = (${language})
        AND par_c.link = (${parent});
    `;
}

export async function getCategoryById(id: string) {
    const res = (
        await sql.query(`
            SELECT c.id as id, c.name as name, rl.id as restlang, r.name as restaurant_name, r.link as restaurant_link, rl.language_id as language, c.link as link, par_c.name as parent, c.image as image
            FROM Categories c
            JOIN Rest_Languages rl ON c.rest_language_id = rl.id
            JOIN Restaurantes r ON rl.restaurante_id = r.id
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

export async function listCategories({
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
        JOIN Rest_Languages rl ON c.rest_language_id = rl.id
        JOIN Restaurantes r ON rl.restaurante_id = r.id
        LEFT JOIN Categories par_c ON c.parent_id = par_c.id
        ${baseQuery(fieldMap[filterField as keyof typeof fieldMap], filterOperator, filterValue)}
        ORDER BY (${sortBy}) ${orderByDirection}
        LIMIT (${size}) OFFSET (${page * size})
        `)
    ).rows;
    return res as CategoryTable[];
}

export async function getCountCategories(
    filterField?: string,
    filterOperator?: string,
    filterValue?: string
) {
    return (
        await sql.query(`
        SELECT COUNT(c.id)
        FROM Categories c
        JOIN Rest_Languages rl ON c.rest_language_id = rl.id
        JOIN Restaurantes r ON rl.restaurante_id = r.id
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
        JOIN Rest_Languages rl ON child.rest_language_id = rl.id
        JOIN Categories parent ON child.parent_id = parent.id
        WHERE rl.restaurante_id = '${restaurant}' AND rl.language_id = '${language}' AND parent.parent_id IS NULL;
    `)
    ).rows as { id: string; name: string }[];
}

export async function getAllParents(restaurantLanguage: string) {
    return (
        await sql.query(`
        SELECT child.id, child.name
        FROM Categories child
        JOIN Rest_Languages rl ON child.rest_language_id = rl.id
        JOIN Categories parent ON child.parent_id = parent.id
        WHERE rl.id = '${restaurantLanguage}' AND parent.parent_id IS NULL;
    `)
    ).rows as { id: string; name: string }[];
}

export async function getAllChildrenByRestLang(
    restaurant: string,
    language: string
) {
    return (
        await sql.query(`
        SELECT child.id, child.name
        FROM Categories child
        JOIN Rest_Languages rl ON child.rest_language_id = rl.id
        JOIN Categories parent ON child.parent_id = parent.id
        WHERE rl.restaurante_id = '${restaurant}' AND rl.language_id = '${language}' AND parent.parent_id IS NOT NULL;
    `)
    ).rows as { id: string; name: string }[];
}
