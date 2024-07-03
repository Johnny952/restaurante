"use server";
import { sql } from "@vercel/postgres";
import { DishInterface, DishTable } from "./index.types";
import { TableParams } from "../helpers/index.types";
import baseQuery from "../helpers/base-query";

/**
 * Get the dishes of the given restaurant, language and category
 * @param restaurantLink - The restaurant link
 * @param language - The language
 * @param categoryLink - The category link of the dishes
 * @returns List of dishes
 */
export async function getByCategory(
    restaurantLink: string,
    language: string,
    categoryLink: string
) {
    return sql<DishInterface>`
        SELECT d.id, d.name as name, d.link as link, d.image as image, d.description as description, d.price as price
        FROM Dishes d
        JOIN Categories c ON d.category_id = c.id
        JOIN Restaurant_Languages rl ON c.restaurant_language_id = rl.id
        JOIN Restaurants r ON r.id = rl.restaurant_id
        WHERE r.link = (${restaurantLink})
        AND rl.language_id = (${language})
        AND c.link=(${categoryLink});
    `;
}

/**
 * Get dish information
 * @param restaurantLink - The restaurant link
 * @param language - The language
 * @param category - The category link of the dishes
 * @param dishLink - The dish link
 * @returns Array of 1 dish or empty in case it is not found
 */
export async function getByLink(
    restaurantLink: string,
    language: string,
    categoryLink: string,
    dishLink: string
) {
    return sql<DishInterface>`
        SELECT d.name as name, d.link as link, d.image as image, d.description as description, d.price as price
        FROM Restaurants r
        JOIN Restaurant_Languages rl ON r.id = rl.restaurant_id
        JOIN Categories c ON rl.id = c.restaurant_language_id
        JOIN Dishes d ON d.category_id = c.id
        WHERE r.link = (${restaurantLink})
        AND rl.language_id = (${language})
        AND c.link = (${categoryLink})
        AND d.link = (${dishLink});
    `;
}

export async function getById(id: string) {
    return (
        await sql.query(`
        SELECT d.id as id, c.name as category, r.name as restaurant, r.id as restaurant_id, rl.language_id as language, d.name as name, d.price as price, d.description as description, d.link as link, d.image as image
        FROM Dishes d
        JOIN Categories c ON d.category_id = c.id
        JOIN Restaurant_Languages rl ON c.restaurant_language_id = rl.id
        JOIN Restaurants r ON rl.restaurant_id = r.id
        WHERE d.id = (${id})
    `)
    ).rows[0] as DishTable;
}

const fieldMap = {
    id: "d.id",
    category: "c.name",
    restaurant: "r.name",
    name: "d.name",
    price: "d.price",
    description: "d.description",
    link: "d.link",
    image: "d.image",
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
        SELECT d.id as id, c.name as category, r.name as restaurant, rl.language_id as language, d.name as name, d.price as price, d.description as description, d.link as link, d.image as image
        FROM Dishes d
        JOIN Categories c ON d.category_id = c.id
        JOIN Restaurant_Languages rl ON c.restaurant_language_id = rl.id
        JOIN Restaurants r ON rl.restaurant_id = r.id
        ${baseQuery(fieldMap[filterField as keyof typeof fieldMap], filterOperator, filterValue)}
        ORDER BY (${sortBy}) ${orderByDirection}
        LIMIT (${size}) OFFSET (${page * size})
        `)
    ).rows;
    return res as DishTable[];
}

export async function getCount(
    filterField?: string,
    filterOperator?: string,
    filterValue?: string
) {
    return (
        await sql.query(`
        SELECT COUNT(d.id)
        FROM Dishes d
        JOIN Categories c ON d.category_id = c.id
        JOIN Restaurant_Languages rl ON c.restaurant_language_id = rl.id
        JOIN Restaurants r ON rl.restaurant_id = r.id
        ${baseQuery(fieldMap[filterField as keyof typeof fieldMap], filterOperator, filterValue)}
    `)
    ).rows[0] as { count: string };
}
