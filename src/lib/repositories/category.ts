"use server";

import { sql } from "@vercel/postgres";
import { CategoryType } from "../models/categories";
import { FilterParams, TableParams } from "../models/pagination";
import buildQueryFilter from "../util/query-filter-builder";
import DatabaseError from "../errors/database-error";
import paramJoin from "../util/param-join";
import { singleSQLQuery } from "../util/sql-query-builder";

export async function get(fields: Partial<CategoryType>) {
    const rows = await singleSQLQuery({
        query: async () => {
            const { queryString, values } = paramJoin(fields);
            return await sql.query<CategoryType>(
                `
                SELECT *
                FROM category_details
                WHERE ${queryString}
            `,
                values
            );
        },
        notFoundMessage: "Categoría no encontrada",
        dataBaseMessage: "Error al conseguir categoría",
    });
    return rows[0];
}

export async function getAll(fields: Partial<CategoryType>) {
    const rows = await singleSQLQuery({
        query: async () => {
            const { queryString, values } = paramJoin(fields);
            return await sql.query<CategoryType>(
                `
                SELECT *
                FROM category_details
                WHERE ${queryString}
            `,
                values
            );
        },
        notFoundMessage: "No existen categorías",
        dataBaseMessage: "Error al conseguir todas las categorías",
    });
    return rows;
}

export async function getAllChildren({
    restaurantId,
    language_id,
}: {
    restaurantId: string;
    language_id: string;
}) {
    try {
        const { rows } = await sql.query<CategoryType>(
            `
            SELECT parent.*
            FROM category_details parent
            LEFT JOIN category_details child ON parent.id = child.parent_category_id
            WHERE parent.restaurant_id = $1 
            AND parent.language_id = $2 
            AND parent.is_deleted = false
            AND child.id IS NULL;
        `,
            [restaurantId, language_id]
        );
        return rows;
    } catch (error) {
        const err = error as Error;
        throw new DatabaseError(
            `Error al conseguir las categorías: ${err.message}`
        );
    }
}

export async function list({
    pagination,
    sort,
    filter,
}: TableParams<keyof CategoryType>) {
    try {
        const filterQuery = filter ? buildQueryFilter(filter) : "";
        const { rows } = await sql.query<CategoryType>(
            `
            SELECT *
            FROM category_details
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
            `Error al listar todas las categorías: ${err.message}`
        );
    }
}

export async function listCount(filter: FilterParams<keyof CategoryType>) {
    try {
        const filterQuery = filter ? buildQueryFilter(filter) : "";
        const { rows } = await sql.query<{ count: string }>(`
            SELECT COUNT(id) as count
            FROM category_details
            ${filterQuery}
        `);
        return Number(rows[0].count);
    } catch (error) {
        const err = error as Error;
        throw new DatabaseError(
            `Error al conseguir el conteo de las categorías: ${err.message}`
        );
    }
}

export async function put({
    name,
    restaurantId,
    languageId,
    link,
    parentId,
    image,
}: {
    name: string;
    restaurantId: number;
    languageId: string;
    link: string;
    parentId?: string;
    image: string;
}) {
    await singleSQLQuery({
        query: async () => {
            return await sql.query(
                `
                WITH new_category AS (
                    INSERT INTO categories (restaurant_id, image, parent_id)
                    VALUES ($1, $2, $3)
                    RETURNING id
                )
                INSERT INTO category_translations (category_id, language_id, name, link)
                SELECT id, $4, $5, $6
                FROM new_category;
            `,
                [restaurantId, image, parentId, languageId, name, link]
            );
        },
        notFoundMessage: "No se pudo crear la categoría",
        dataBaseMessage: "Error al crear nueva categoría",
    });
}

export async function putTranslation({
    id,
    name,
    languageId,
    link,
}: {
    id: string;
    name: string;
    languageId: string;
    link: string;
}) {
    await singleSQLQuery({
        query: async () => {
            return await sql.query(
                `
                INSERT INTO category_translations (category_id, language_id, name, link)
                VALUES ($1, $2, $3, $4)
            `,
                [id, languageId, name, link]
            );
        },
        notFoundMessage: "No se pudo crear la traducción de la categoría",
        dataBaseMessage: "Error al crear nueva traducción de categoría",
    });
}

export async function updateTranslation(id: string | number, fields: object) {
    await singleSQLQuery({
        query: async () => {
            const { queryString, values } = paramJoin(fields);
            return await sql.query(
                `
                UPDATE category_translations
                SET ${queryString}
                WHERE id = $${values.length + 1}
            `,
                [...values, id]
            );
        },
        notFoundMessage: "Traducción de categoría no encontrada",
        dataBaseMessage: "Error al actualizar la traducción de la categoría",
    });
}

export async function update(id: string, fields: object) {
    await singleSQLQuery({
        query: async () => {
            const { queryString, values } = paramJoin(fields);
            return await sql.query(
                `
                UPDATE categories
                SET ${queryString}
                WHERE id = $${values.length + 1}
            `,
                [...values, id]
            );
        },
        notFoundMessage: "Categoría no encontrada",
        dataBaseMessage: "Error al actualizar la categoría",
    });
}

export async function del(id: string | number) {
    await singleSQLQuery({
        query: async () => {
            return await sql.query(
                `
                DELETE FROM categories
                WHERE id = $1
            `,
                [id]
            );
        },
        notFoundMessage: "Categoría no encontrada",
        dataBaseMessage: "Error al eliminar la categoría",
    });
}
