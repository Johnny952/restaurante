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
        INSERT INTO Categories (name, link, parent_id, image, rest_language_id)
        VALUES ((${name}), (${link}), (
            SELECT parent.id
            FROM Categories child
            JOIN Rest_Languages rl ON child.rest_language_id = rl.id
            JOIN Categories parent ON child.parent_id = parent.id
            WHERE rl.restaurante_id = (${restaurant}) AND rl.language_id = (${language}) AND parent.parent_id IS NULL;
        ), (${image}), (
            SELECT id
            FROM Rest_Languages
            WHERE language_id=(${language}) AND restaurante_id=(${restaurant})
        ));`;
    }
    return sql`
    INSERT INTO Categories (name, link, parent_id, image, rest_language_id)
    VALUES ((${name}), (${link}), (${parent}), (${image}), (
        SELECT id
        FROM Rest_Languages
        WHERE language_id = (${language}) AND restaurante_id = (${restaurant})
    ));`;
}
