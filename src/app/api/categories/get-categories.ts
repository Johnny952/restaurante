import { sql } from "@vercel/postgres";
import { CategoryAPI } from "./index.types";

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
        JOIN Categories par_c ON c.parent_id = par_c.id
        WHERE r.link = (${restauranteLink})
        AND rl.language_id = (${language})
        AND par_c.link = (${parent});
    `;
}
