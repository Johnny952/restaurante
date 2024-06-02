import { sql } from "@vercel/postgres";
import { CategoryAPI } from "./get-categories.types";

/**
 * Get main background
 * @param restaurante - The restaurante name
 * @returns The root background
 */
export async function getRoot(restaurante: string) {
    return sql<{ image: string }>`
    SELECT image
    FROM Categories
    WHERE restaurante=(${restaurante}) AND category='root'`;
}

/**
 * Get category information
 * @param restaurante - The restaurante name
 * @param language - The language
 * @param category - The category
 * @returns The category information
 */
export async function getCategory(restaurante: string, language: string, category: string) {
    return sql<CategoryAPI>`
    SELECT category_name, image
    FROM Categories
    WHERE restaurante=(${restaurante}) AND language=(${language}) AND category=(${category})`;
}

/**
 * Get subcategories for the given category
 * @param restaurante - The restaurante name
 * @param language - The language
 * @param categoryFather - The category father
 * @returns List of categories
 */
export async function getCategories(restaurante: string, language: string, categoryFather: string) {
    return sql<CategoryAPI>`
    SELECT category_name, category, image
    FROM Categories
    WHERE restaurante=(${restaurante}) AND language=(${language}) AND category_father=(${categoryFather})`;
}

/**
 * Get every category and subcategory of the restaurante
 * @param restaurante - The restaurante name
 * @param language - The language
 * @returns List of categories
 */
export async function getAllCategories(restaurante: string, language: string) {
    return sql<CategoryAPI>`
    SELECT category_name, category, image, category_father
    FROM Categories
    WHERE language=(${language}) AND restaurante=(${restaurante})`;
}