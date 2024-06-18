"use server";
import { sql } from "@vercel/postgres";
import { LanguageInterface } from "./index.types";

/**
 * Get available languages for the restaurante
 * @param restauranteLink - The restaurante link
 * @returns The list of languages
 */
export async function getLanguages(restauranteLink: string) {
    return sql<LanguageInterface>`
        SELECT l.id as link, l.name as name
        FROM Restaurantes r
        JOIN Rest_Languages rl ON r.id = rl.restaurante_id
        JOIN Languages l ON rl.language_id = l.id
        WHERE r.link = (${restauranteLink});
    `;
}
