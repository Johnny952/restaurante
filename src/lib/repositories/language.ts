"use server";
import { sql } from "@vercel/postgres";
import { LanguageType, LanguageWithRestaurantType, RestaurantLanguageType } from "../models/language";
import DatabaseError from "../errors/database-error";
import { FilterParams, TableParams } from "../models/pagination";
import buildQueryFilter from "../util/query-filter-builder";
import paramJoin from "../util/param-join";
import { singleSQLQuery } from "../util/sql-query-builder";

/**
 * Get language by field
 * @param fields - The fields to search by
 * @returns language
 */
export async function get(fields: Partial<LanguageType>) {
    const rows = await singleSQLQuery({
        query: async () => {
            const { queryString, values } = paramJoin(fields);
            return await sql.query<LanguageType>(`
                SELECT *
                FROM languages
                WHERE ${queryString}
            `, values);
        },
        notFoundMessage: "Idioma no encontrado",
        dataBaseMessage: "Error al conseguir idioma",
    });
    return rows[0];
}

export async function getAllByRestaurantLink(link: string) {
    const rows = await singleSQLQuery({
        query: async () => {
            return await sql.query<RestaurantLanguageType>(`
                SELECT *
                FROM restaurant_languages_view
                WHERE restaurant_link = $1
            `, [link]);
        },
        notFoundMessage: "Idiomas asociado al restaurante no encontrados",
        dataBaseMessage: "Error al conseguir idiomas",
    });
    return rows;
}

/**
 * Get all languages
 * @returns languages
 */
export async function getAll() {
    const rows = await singleSQLQuery({
        query: async () => {
            return await sql.query<LanguageType>(`
                SELECT *
                FROM languages
            `);
        },
        notFoundMessage: "No existen idiomas",
        dataBaseMessage: "Error al conseguir todos los idiomas",
    });
    return rows;
}

/**
 * Get all languages paginated and sorted
 * @param param - The parameters
 * @returns languages
 */
export async function list({
    pagination,
    sort,
    filter,
}: TableParams<keyof LanguageType>) {
    try {
        const filterQuery = filter ? buildQueryFilter(filter) : "";
        const { rows } = await sql.query<LanguageType>(`
            SELECT *
            FROM languages
            ${filterQuery}
            ORDER BY ${sort.by} ${sort.order}
            LIMIT $1 OFFSET $2
        `, [pagination.size, pagination.page * pagination.size]);
        return rows;
    } catch (error) {
        const err = error as Error;
        throw new DatabaseError(
            `Error al listar todos los idiomas: ${err.message}`
        );
    }
}

/**
 * Get count of languages
 * @param filter - The filter
 * @returns count
 */
export async function listCount(filter: FilterParams<keyof LanguageType>) {
    try {
        const filterQuery = filter ? buildQueryFilter(filter) : "";
        const { rows } = await sql.query<{ count: string }>(`
            SELECT COUNT(id) as count
            FROM languages
            ${filterQuery}
        `);
        return Number(rows[0].count);
    } catch (error) {
        const err = error as Error;
        throw new DatabaseError(
            `Error al conseguir el conteo de los idiomas: ${err.message}`
        );
    }
}

/**
 * Create language
 * @param code - The language code
 * @param name - The language name
 */
export async function put({
    code,
    name,
}: {
    code: string;
    name: string;
}) {
    await singleSQLQuery({
        query: async () => {
            return await sql.query(`
                INSERT INTO languages (code, name)
                VALUES ($1, $2)
            `, [code, name]);
        },
        notFoundMessage: "No se pudo crear el idioma",
        dataBaseMessage: "Error al crear nuevo idioma",
    });
}

/**
 * Update language
 * @param id - The language id
 * @param fields - The fields to update
 */
export async function update(id: string, fields: Partial<LanguageType>) {
    await singleSQLQuery({
        query: async () => {
            const { queryString, values } = paramJoin(fields);
            return await sql.query(`
                UPDATE languages
                SET ${queryString}
                WHERE id = $${values.length + 1}
            `, [...values, id]);
        },
        notFoundMessage: "Idioma no encontrado",
        dataBaseMessage: "Error al actualizar idioma",
    });
}

/**
 * Delete language
 * @param id - The language id
 */
export async function del(id: string) {
    await singleSQLQuery({
        query: async () => {
            return await sql.query(`
                DELETE FROM languages
                WHERE id = $1
            `, [id]);
        },
        notFoundMessage: "Idioma no encontrado",
        dataBaseMessage: "Error al eliminar idioma",
    });
}


/**
 * Get languages associated with a restaurant
 * @param restaurantId - The restaurant id
 * @returns languages associated with the restaurant
 */
export async function getLanguagesByRestaurant(restaurantId: number) {
    const rows = await singleSQLQuery({
        query: async () => {
            return await sql.query<LanguageWithRestaurantType>(`
                SELECT l.*, r.id as restaurant_id, r.link as restaurant_link
                FROM languages l
                JOIN restaurant_languages rl ON l.id = rl.language_id
                JOIN restaurants r ON r.id = rl.restaurant_id
                WHERE r.id = $1
            `, [restaurantId]
            );
        },
        notFoundMessage: "No se encontraron idiomas para este restaurante",
        dataBaseMessage: "Error al obtener los idiomas del restaurante",
    });
    return rows;
}

/**
 * Associate a language with a restaurant
 * @param restaurantId - The restaurant id
 * @param languageId - The language id
 */
export async function associateLanguageWithRestaurant(restaurantId: string, languageId: string) {
    await singleSQLQuery({
        query: async () => {
            return await sql.query(`
                INSERT INTO restaurant_languages (restaurant_id, language_id)
                VALUES ($1, $2)
                ON CONFLICT (restaurant_id, language_id) DO NOTHING
            `, [restaurantId, languageId]);
        },
        notFoundMessage: "No se pudo asociar el idioma con el restaurante",
        dataBaseMessage: "Error al asociar el idioma con el restaurante",
    });
}

/**
 * Disassociate a language from a restaurant
 * @param restaurantId - The restaurant id
 * @param languageId - The language id
 */
export async function disassociateLanguageFromRestaurant(restaurantId: string, languageId: string) {
    await singleSQLQuery({
        query: async () => {
            return await sql.query(`
                DELETE FROM restaurant_languages
                WHERE restaurant_id = $1 AND language_id = $2
            `, [restaurantId, languageId]);
        },
        notFoundMessage: "No se pudo desasociar el idioma del restaurante",
        dataBaseMessage: "Error al desasociar el idioma del restaurante",
    });
}

/**
 * Get all languages with their associated restaurants
 * @param param - The parameters for pagination, sorting, and filtering
 * @returns languages with their associated restaurants
 */
export async function listWithRestaurants({
    pagination,
    sort,
    filter,
}: TableParams<keyof LanguageWithRestaurantType>) {
    try {
        const filterQuery = filter ? buildQueryFilter(filter) : "";
        const { rows } = await sql.query<LanguageWithRestaurantType>(`
            SELECT l.*, r.id as restaurant_id, r.link as restaurant_link
            FROM languages l
            LEFT JOIN restaurant_languages rl ON l.id = rl.language_id
            LEFT JOIN restaurants r ON r.id = rl.restaurant_id
            ${filterQuery}
            ORDER BY ${sort.by} ${sort.order}
            LIMIT ${pagination.size} OFFSET ${pagination.page * pagination.size}
        `)
        return rows;
    } catch (error) {
        const err = error as Error;
        throw new DatabaseError(
            `Error al listar los idiomas con sus restaurantes asociados: ${err.message}`
        );
    }
}