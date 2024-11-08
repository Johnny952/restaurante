"use server";
import { sql } from "@vercel/postgres";
import { BaseRestaurantType, RestaurantType } from "../models/restaurant";
import DatabaseError from "../errors/database-error";
import { FilterParams, TableParams } from "../models/pagination";
import buildQueryFilter from "../util/query-filter-builder";
import paramJoin from "../util/param-join";
import { singleSQLQuery } from "../util/sql-query-builder";


/**
 * Get restaurant by field
 * @param fields - The fields to search by
 * @returns restaurant
 */
export async function get(fields: Partial<RestaurantType>) {
    const rows = await singleSQLQuery({
        query: async () => {
            const { queryString, values } = paramJoin(fields);
            return await sql.query<RestaurantType>(`
                SELECT *
                FROM restaurants
                WHERE ${queryString}
            `, values);
        },
        notFoundMessage: "Restaurante no encontrado",
        dataBaseMessage: "Error al conseguir restaurante",
    });
    return rows[0];
}

/**
 * Get all restaurants
 * @returns restaurants
 */
export async function getAll() {
    const rows = await singleSQLQuery({
        query: async () => {
            return await sql.query<BaseRestaurantType>(`
                SELECT id, name, link
                FROM restaurants
                WHERE is_deleted = FALSE
            `);
        },
        notFoundMessage: "No existen restaurantes",
        dataBaseMessage: "Error al conseguir todos los restaurantes",
    });
    return rows;
}

/**
 * Get all restaurants paginated and sorted
 * @param param - The parameters
 * @returns restaurants
 */
export async function list({
    pagination,
    sort,
    filter,
}: TableParams<keyof RestaurantType>) {
    try {
        const filterQuery = filter ? buildQueryFilter(filter) : "";
        const { rows } = await sql.query<RestaurantType>(`
            SELECT *
            FROM restaurants
            WHERE is_deleted = FALSE
            ${filterQuery}
            ORDER BY ${sort.by} ${sort.order}
            LIMIT $1 OFFSET $2
        `, [pagination.size, pagination.page * pagination.size]);
        return rows;
    } catch (error) {
        const err = error as Error;
        throw new DatabaseError(
            `Error al listar todos los restaurantes: ${err.message}`
        );
    }
}

/**
 * Get count of restaurants
 * @param filter - The filter
 * @returns count
 */
export async function listCount(filter: FilterParams<keyof RestaurantType>) {
    try {
        const filterQuery = filter ? buildQueryFilter(filter) : "";
        const { rows } = await sql.query<{ count: string }>(`
            SELECT COUNT(id) as count
            FROM restaurants
            WHERE is_deleted = FALSE
            ${filterQuery}
        `);
        return Number(rows[0].count);
    } catch (error) {
        const err = error as Error;
        throw new DatabaseError(
            `Error al conseguir el conteo de los restaurantes: ${err.message}`
        );
    }
}

/**
 * Create restaurant
 * @param name - The restaurant name
 * @param link - The restaurant link
 * @param logo - The restaurant logo
 * @param background - The restaurant background image
 */
export async function put({
    name,
    link,
    logo,
    background,
}: {
    name: string;
    link: string;
    logo: string;
    background?: string | null;
}) {
    await singleSQLQuery({
        query: async () => {
            return await sql.query(`
                INSERT INTO restaurants (name, link, logo, background_image)
                VALUES ($1, $2, $3, $4)
            `, [name, link, logo, background]);
        },
        notFoundMessage: "No se pudo crear el restaurante",
        dataBaseMessage: "Error al crear nuevo restaurante",
    });
}

/**
 * Update restaurant
 * @param id - The restaurant id
 * @param fields - The fields to update
 */
export async function update(id: string, fields: Partial<RestaurantType>) {
    await singleSQLQuery({
        query: async () => {
            const { queryString, values } = paramJoin(fields);
            return await sql.query(`
                UPDATE restaurants
                SET ${queryString}
                WHERE id = $${values.length + 1}
            `, [...values, id]);
        },
        notFoundMessage: "Restaurante no encontrado",
        dataBaseMessage: "Error al actualizar restaurante",
    });
}

/**
 * Delete restaurant (soft delete)
 * @param id - The restaurant id
 */
export async function del(id: string) {
    await singleSQLQuery({
        query: async () => {
            return await sql.query(`
                UPDATE restaurants
                SET is_deleted = TRUE
                WHERE id = $1
            `, [id]);
        },
        notFoundMessage: "Restaurante no encontrado",
        dataBaseMessage: "Error al eliminar restaurante",
    });
}