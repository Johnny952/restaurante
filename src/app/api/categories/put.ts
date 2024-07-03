"use server";
import { sql } from "@vercel/postgres";

export async function put(
    name: string,
    restaurant: string,
    language: string,
    link: string,
    parent: string,
    image: string
) {
    if (!parent) {
        return sql`
        INSERT INTO Categories (name, link, parent_id, image, restaurant_language_id)
        VALUES ((${name}), (${link}), NULL, (${image}), (
            SELECT id
            FROM Restaurant_Languages
            WHERE language_id=(${language}) AND restaurant_id=(${restaurant})
        ));`;
    }
    return sql`
    INSERT INTO Categories (name, link, parent_id, image, restaurant_language_id)
    VALUES ((${name}), (${link}), (${parent}), (${image}), (
        SELECT id
        FROM Restaurant_Languages
        WHERE language_id = (${language}) AND restaurant_id = (${restaurant})
    ));`;
}
