"use server";
import { sql } from "@vercel/postgres";
import { RestauranteInterface } from "./index.types";

/**
 * Get restaurant information
 * @param link - The restaurante link
 * @returns Restaurante information
 */
export async function getRestaurante(link: string) {
    return sql<RestauranteInterface>`
        SELECT name, link, image
        FROM Restaurantes
        WHERE link=(${link})
    `;
}

/**
 * Get restaurant information
 * @param id - The restaurant identifier
 * @returns Restaurante information
 */
export async function getRestauranteByID(id: string) {
    const res = await sql<RestauranteInterface>`
        SELECT name, link, image
        FROM Restaurantes
        WHERE id=(${id})
    `;
    return res.rows[0];
}

/**
 * Return SQL filter depending on filters parameters
 * @param filterField - Field to filter data
 * @param filterOperator - Filter operation
 * @param filterValue - Filter value
 * @returns Where sql query
 */
function baseQuery(
    filterField?: string,
    filterOperator?: string,
    filterValue?: string
) {
    let query: string = "";
    if (
        filterField &&
        filterOperator &&
        filterValue &&
        filterValue !== "" &&
        filterValue !== "undefined"
    ) {
        switch (filterOperator) {
            case "contains":
                query = `WHERE (${filterField}) LIKE '${"%" + filterValue + "%"}'`;
                break;
            case "equals":
                query = `WHERE (${filterField})='${filterValue}'`;
                break;
            case "startsWith":
                query = `WHERE (${filterField}) LIKE '${filterValue + "%"}'`;
                break;
            case "endsWith":
                query = `WHERE (${filterField}) LIKE '${"%" + filterValue}'`;
                break;
            default:
                query = "";
                break;
        }
    }
    return query;
}

/**
 * List restaurants with pagination, sorting and filtering
 * @param param - Pagination, sorting and filtering parameters
 * @returns Restaurante list
 */
export async function listRestaurantes({
    page = 0,
    size = 25,
    sortBy = "name",
    sortOrder = "ASC",
    filterField,
    filterOperator,
    filterValue,
}: {
    page?: number;
    size?: number;
    sortBy?: string;
    sortOrder?: string;
    filterField?: string;
    filterOperator?: string;
    filterValue?: string;
}) {
    const orderByDirection =
        sortOrder.toLowerCase() === "desc" ? "DESC" : "ASC";
    const res = (
        await sql.query(`
        SELECT id, name, image, link
        FROM Restaurantes
        ${baseQuery(filterField, filterOperator, filterValue)}
        ORDER BY (${sortBy}) ${orderByDirection}
        LIMIT (${size}) OFFSET (${page * size})`
        )
    ).rows;
    return res as RestauranteInterface[];
}

/**
 * Get total number of restaurants
 * @returns
 */
export async function getCountRestaurantes(
    filterField?: string,
    filterOperator?: string,
    filterValue?: string
) {
    return (
        await sql.query(`
        SELECT COUNT(id)
        FROM Restaurantes
        ${baseQuery(filterField, filterOperator, filterValue)}
    `)
    ).rows[0] as { count: string };
}
