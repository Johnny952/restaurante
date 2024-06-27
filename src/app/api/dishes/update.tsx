"use server";
import { sql } from "@vercel/postgres";

export async function updateNameLink(id: string, name: string, link: string) {
    return sql`
    UPDATE Dishes
    SET name=(${name}), link=(${link})
    WHERE id=(${id})`;
}

export async function updateImage(id: string, image: string) {
    return sql`
    UPDATE Dishes
    SET image=(${image})
    WHERE id=(${id})`;
}

export async function updateCategory(id: string, category: string) {
    return sql`
    UPDATE Dishes
    SET category_id=(${category})
    WHERE id=(${id})`;
}

export async function updatePrice(id: string, price: string) {
    return sql`
    UPDATE Dishes
    SET price=(${price})
    WHERE id=(${id})`;
}

export async function updateDescription(id: string, description: string) {
    return sql`
    UPDATE Dishes
    SET description=(${description})
    WHERE id=(${id})`;
}
