"use server";
import { sql } from "@vercel/postgres";

export async function putRestaurante(name: string, link: string, logo: string) {
    return sql`
    INSERT INTO Restaurantes (restaurante, link, image)
    VALUES ((${name}), (${link}), (${logo}))`;
}
