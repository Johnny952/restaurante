"use server";
import { sql } from "@vercel/postgres";

export async function updateRestaurant(id: string, restaurantId: string) {
    return sql`
    UPDATE Restaurant_Languages
    SET restaurant_id=(${restaurantId})
    WHERE id=(${id})`;
}

export async function updateLanguage(id: string, languageId: string) {
    return sql`
    UPDATE Restaurant_Languages
    SET language_id=(${languageId})
    WHERE id=(${id})`;
}
