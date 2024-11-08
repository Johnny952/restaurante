"use server";
import { sql } from "@vercel/postgres";
import { RestaurantsLanguagesType } from "../models/restaurants-languages";
import DatabaseError from "../errors/database-error";
import { FilterParams, TableParams } from "../models/pagination";
import buildQueryFilter from "../util/query-filter-builder";
import paramJoin from "../util/param-join";
import { singleSQLQuery } from "../util/sql-query-builder";

/**
 * Get restaurant language by fields
 * @param fields - The fields to search by
 * @returns restaurant language
 */
export async function get(fields: Partial<RestaurantsLanguagesType>) {
    const rows = await singleSQLQuery({
        query: async () => {
            const { queryString, values } = paramJoin(fields);
            return await sql.query<RestaurantsLanguagesType>(
                `
                SELECT *
                FROM restaurant_languages_view
                WHERE ${queryString}
            `,
                values
            );
        },
        notFoundMessage: "Idioma del restaurante no encontrado",
        dataBaseMessage: "Error al conseguir idioma del restaurante",
    });
    return rows[0];
}

/**
 * Get all restaurant languages
 * @returns restaurant languages
 */
export async function getAll() {
    const rows = await singleSQLQuery({
        query: async () => {
            return await sql.query<RestaurantsLanguagesType>(`
                SELECT *
                FROM restaurant_languages_view
            `);
        },
        notFoundMessage: "No existen idiomas de restaurantes",
        dataBaseMessage: "Error al conseguir todos los idiomas de restaurantes",
    });
    return rows;
}

/**
 * Get all restaurant languages paginated and sorted
 * @param param - The parameters
 * @returns restaurant languages
 */
export async function list({
    pagination,
    sort,
    filter,
}: TableParams<keyof RestaurantsLanguagesType>) {
    try {
        const filterQuery = filter ? buildQueryFilter(filter) : "";
        const { rows } = await sql.query<RestaurantsLanguagesType>(
            `
            SELECT *
            FROM restaurant_languages_view
            ${filterQuery}
            ORDER BY ${sort.by} ${sort.order}
            LIMIT $1 OFFSET $2
        `,
            [pagination.size, pagination.page * pagination.size]
        );
        return rows;
    } catch (error) {
        const err = error as Error;
        throw new DatabaseError(
            `Error al listar todos los idiomas de restaurantes: ${err.message}`
        );
    }
}

/**
 * Get count of restaurant languages
 * @param filter - The filter
 * @returns count
 */
export async function listCount(
    filter: FilterParams<keyof RestaurantsLanguagesType>
) {
    try {
        const filterQuery = filter ? buildQueryFilter(filter) : "";
        const { rows } = await sql.query<{ count: string }>(`
            SELECT COUNT(*) as count
            FROM restaurant_languages_view
            ${filterQuery}
        `);
        return Number(rows[0].count);
    } catch (error) {
        const err = error as Error;
        throw new DatabaseError(
            `Error al conseguir el conteo de los idiomas de restaurantes: ${err.message}`
        );
    }
}

/**
 * Create restaurant language
 * @param restaurant_id - The restaurant id
 * @param language_id - The language id
 */
export async function put({
    restaurant_id,
    language_id,
}: {
    restaurant_id: string;
    language_id: string;
}) {
    await singleSQLQuery({
        query: async () => {
            return await sql.query(
                `
                INSERT INTO restaurant_languages (restaurant_id, language_id)
                VALUES ($1, $2)
            `,
                [restaurant_id, language_id]
            );
        },
        notFoundMessage: "No se pudo crear el idioma del restaurante",
        dataBaseMessage: "Error al crear nuevo idioma del restaurante",
    });
}

/**
 * Delete restaurant language
 * @param restaurant_id - The restaurant id
 * @param language_id - The language id
 */
export async function del(restaurant_id: string, language_id: string) {
    await singleSQLQuery({
        query: async () => {
            return await sql.query(
                `
                DELETE FROM restaurant_languages
                WHERE restaurant_id = $1 AND language_id = $2
            `,
                [restaurant_id, language_id]
            );
        },
        notFoundMessage: "Idioma del restaurante no encontrado",
        dataBaseMessage: "Error al eliminar idioma del restaurante",
    });
}
