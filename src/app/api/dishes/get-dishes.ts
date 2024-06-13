import { sql } from "@vercel/postgres";
import { DishInterface } from "./index.types";

/**
 * Get the dishes of the given restaurante, language and category
 * @param restaurante - The restaurante name
 * @param language - The language
 * @param category - The category of the dishes
 * @returns List of dishes
 */
export async function getDishes(
    restaurante: string,
    language: string,
    category: string
) {
    return sql<DishInterface>`
        SELECT name, image, link, description, price
        FROM Dishes
        WHERE restaurante=(${restaurante}) AND language=(${language}) AND category=(${category})
    `;
}

/**
 * Get dish information
 * @param restaurante - The restaurante name
 * @param language - The language
 * @param category - The category of the dishes
 * @param dish - The dish name
 * @returns Array of 1 dish or empty in case it is not found
 */
export async function getDish(
    restaurante: string,
    language: string,
    category: string,
    dish: string
) {
    return sql<DishInterface>`
        SELECT name, image, link, description, price
        FROM Dishes
        WHERE restaurante=(${restaurante}) AND language=(${language}) AND category=(${category}) AND link=(${dish})
    `;
}
