"use server";
import { sql } from "@vercel/postgres";

export async function updateRestLangRestaurant(
    id: string,
    restaurantId: string
) {
    return sql`
    UPDATE Rest_Languages
    SET restaurante_id=(${restaurantId})
    WHERE id=(${id})`;
}

export async function updateRestLangLanguage(id: string, languageId: string) {
    return sql`
    UPDATE Rest_Languages
    SET language_id=(${languageId})
    WHERE id=(${id})`;
}
