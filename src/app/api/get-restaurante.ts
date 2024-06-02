import { sql } from "@vercel/postgres";
import { RestauranteInterface } from "./get-restaurante.types";

/**
 * Get restaurante information
 * @param restaurante - The restaurante link
 * @returns Restaurante information
 */
export async function getRestaurante(restaurante: string) {
    return sql<RestauranteInterface>`
    SELECT restaurante, image
    FROM Restaurantes
    WHERE link=(${restaurante})`;
}
