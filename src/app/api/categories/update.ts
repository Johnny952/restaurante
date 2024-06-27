"use server";
import { sql } from "@vercel/postgres";

export async function updateNameLink(id: string, name: string, link: string) {
    return sql`
    UPDATE Categories
    SET name=(${name}), link=(${link})
    WHERE id=(${id})`;
}

export async function updateRestLang(
    id: string,
    restaurant: string,
    language: string
) {
    return sql`
    UPDATE Categories
    SET rest_language_id=(
        SELECT id
        FROM Rest_Languages
        WHERE restaurante_id=(${restaurant}) AND language_id=(${language})
    )
    WHERE id=(${id})`;
}

export async function updateParent(
    id: string,
    parent: string,
    restaurantLanguage: string
) {
    if (!parent) {
        return sql`
        UPDATE Categories
        SET parent_id=(
            SELECT parent.id
            FROM Categories child
            JOIN Categories parent ON child.parent_id = parent.id
            WHERE child.rest_language_id=(${restaurantLanguage}) AND parent.parent_id IS NULL
        )
        WHERE id=(${id})`;
    }
    return sql`
    UPDATE Categories
    SET parent_id=(${parent})
    WHERE id=(${id})`;
}

export async function updateImage(id: string, image: string) {
    return sql`
    UPDATE Categories
    SET image=(${image})
    WHERE id=(${id})`;
}
