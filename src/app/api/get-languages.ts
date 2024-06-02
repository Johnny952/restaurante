import { sql } from "@vercel/postgres";

export async function getLanguages(name: string) {
    return sql<{ language: string }>`
    SELECT language
    FROM Languages
    WHERE page=(${name})`;
}
