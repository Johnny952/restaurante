"use server";
import { sql } from "@vercel/postgres";

export async function put(
    name: string,
    category: string,
    link: string,
    image: string,
    description: string,
    price: string
) {
    return sql`
    INSERT INTO Dishes (name, link, image, category_id, description, price)
    VALUES ((${name}), (${link}), (${image}), (${category}), (${description}), (${price}));`;
}
