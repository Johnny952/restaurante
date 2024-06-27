"use server";
import { sql } from "@vercel/postgres";
import { DishInterface, DishTable } from "./index.types";
import { TableParams } from "../helpers/index.types";
import baseQuery from "../helpers/base-query";

/**
 * Get the dishes of the given restaurante, language and category
 * @param restauranteLink - The restaurante link
 * @param language - The language
 * @param categoryLink - The category link of the dishes
 * @returns List of dishes
 */
export async function getDishes(
    restauranteLink: string,
    language: string,
    categoryLink: string
) {
    return sql<DishInterface>`
        SELECT d.name as name, d.link as link, d.image as image, d.description as description, d.price as price
        FROM Restaurantes r
        JOIN Rest_Languages rl ON r.id = rl.restaurante_id
        JOIN Categories c ON rl.id = c.rest_language_id
        JOIN Dishes d ON d.category_id = c.id
        WHERE r.link = (${restauranteLink})
        AND rl.language_id = (${language})
        AND c.link=(${categoryLink});
    `;
}

/**
 * Get dish information
 * @param restauranteLink - The restaurante link
 * @param language - The language
 * @param category - The category link of the dishes
 * @param dishLink - The dish link
 * @returns Array of 1 dish or empty in case it is not found
 */
export async function getDish(
    restauranteLink: string,
    language: string,
    categoryLink: string,
    dishLink: string
) {
    return sql<DishInterface>`
        SELECT d.name as name, d.link as link, d.image as image, d.description as description, d.price as price
        FROM Restaurantes r
        JOIN Rest_Languages rl ON r.id = rl.restaurante_id
        JOIN Categories c ON rl.id = c.rest_language_id
        JOIN Dishes d ON d.category_id = c.id
        WHERE r.link = (${restauranteLink})
        AND rl.language_id = (${language})
        AND c.link = (${categoryLink})
        AND d.link = (${dishLink});
    `;
}

export async function getDishById(id: string) {
    return (
        await sql.query(`
        SELECT d.id as id, c.name as category, r.name as restaurant, r.id as restaurant_id, rl.language_id as language, d.name as name, d.price as price, d.description as description, d.link as link, d.image as image
        FROM Dishes d
        JOIN Categories c ON d.category_id = c.id
        JOIN Rest_Languages rl ON c.rest_language_id = rl.id
        JOIN Restaurantes r ON rl.restaurante_id = r.id
        WHERE d.id = (${id})
    `)
    ).rows[0] as DishTable;
}

const fieldMap = {
    id: "d.id",
    category: "c.name",
    restaurante: "r.name",
    name: "d.name",
    price: "d.price",
    description: "d.description",
    link: "d.link",
    image: "d.image",
};

export async function listDishes({
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
        SELECT d.id as id, c.name as category, r.name as restaurant, rl.language_id as language, d.name as name, d.price as price, d.description as description, d.link as link, d.image as image
        FROM Dishes d
        JOIN Categories c ON d.category_id = c.id
        JOIN Rest_Languages rl ON c.rest_language_id = rl.id
        JOIN Restaurantes r ON rl.restaurante_id = r.id
        ${baseQuery(fieldMap[filterField as keyof typeof fieldMap], filterOperator, filterValue)}
        ORDER BY (${sortBy}) ${orderByDirection}
        LIMIT (${size}) OFFSET (${page * size})
        `)
    ).rows;
    return res as DishTable[];
}

export async function getCountDishes(
    filterField?: string,
    filterOperator?: string,
    filterValue?: string
) {
    return (
        await sql.query(`
        SELECT COUNT(d.id)
        FROM Dishes d
        JOIN Categories c ON d.category_id = c.id
        JOIN Rest_Languages rl ON c.rest_language_id = rl.id
        JOIN Restaurantes r ON rl.restaurante_id = r.id
        ${baseQuery(fieldMap[filterField as keyof typeof fieldMap], filterOperator, filterValue)}
    `)
    ).rows[0] as { count: string };
}
