import { sql } from "@vercel/postgres";
import { CategoryAPI } from "./get-categories.types";

export async function getCategories(page: string, language: string, categoryFather: string) {
    return sql<CategoryAPI>`
    SELECT category_name, category, image
    FROM Categories
    WHERE page=(${page}) AND language=(${language}) AND category_father=(${categoryFather})`;
}

export async function getAllCategories(page: string, language: string) {
    return sql<CategoryAPI>`
    SELECT category_name, category, image, category_father
    FROM Categories
    WHERE language=(${language}) AND page=(${page})`;
}