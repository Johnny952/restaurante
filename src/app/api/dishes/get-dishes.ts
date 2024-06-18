import { sql } from "@vercel/postgres";
import { DishInterface } from "./index.types";

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
