import { sql } from "@vercel/postgres";
import { LanguageInterface } from "./index.types";

/**
 * Get available languages for the restaurante
 * @param restaurante - The restaurante name
 * @returns The list of languages
 */
export async function getLanguages(restaurante: string) {
    return sql<LanguageInterface>`
    SELECT language
    FROM Languages
    WHERE restaurante=(${restaurante})`;
}
