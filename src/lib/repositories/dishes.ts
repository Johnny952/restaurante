"use server";

import { sql } from "@vercel/postgres";
import { DishType } from "../models/dishes";
import errors from "../errors";
import { singleSQLQuery } from "../util/sql-query-builder";
import paramJoin from "../util/param-join";
import { FilterParams, TableParams } from "../models/pagination";
import buildQueryFilter from "../util/query-filter-builder";

export async function get(fields: Partial<DishType>) {
    const rows = await singleSQLQuery({
        query: async () => {
            const { queryString, values } = paramJoin(fields);
            return await sql.query<DishType>(
                `
                SELECT *
                FROM dish_details
                WHERE ${queryString}
            `,
                values
            );
        },
        notFoundMessage: "Plato no encontrado",
        dataBaseMessage: "Error al conseguir plato",
    });
    return rows[0];
}

export async function getAll(fields: Partial<DishType>) {
    const rows = await singleSQLQuery({
        query: async () => {
            const { queryString, values } = paramJoin(fields);
            return await sql.query<DishType>(
                `
                SELECT *
                FROM dish_details
                WHERE ${queryString}
            `,
                values
            );
        },
        notFoundMessage: "No existen platos",
        dataBaseMessage: "Error al conseguir todos los platos",
    });
    return rows;
}

export async function list({
    pagination,
    sort,
    filter,
}: TableParams<keyof DishType>) {
    try {
        const filterQuery = filter ? buildQueryFilter(filter) : "";
        const { rows } = await sql.query<DishType>(
            `
            SELECT *
            FROM dish_details
            ${filterQuery}
            ORDER BY ${sort.by} ${sort.order}
            LIMIT $1 OFFSET $2
        `,
            [pagination.size, pagination.page * pagination.size]
        );
        return rows;
    } catch (error) {
        const err = error as Error;
        throw new errors.DatabaseError(
            `Error al conseguir todos los platos: ${err.message}`
        );
    }
}

export async function listCount(filter: FilterParams<keyof DishType>) {
    try {
        const filterQuery = filter ? buildQueryFilter(filter) : "";
        const { rows } = await sql.query<{ count: string }>(`
            SELECT COUNT(*) AS count
            FROM dish_details
            ${filterQuery}
        `);
        return Number(rows[0].count);
    } catch (error) {
        const err = error as Error;
        throw new errors.DatabaseError(
            `Error al conseguir el conteo de los platos: ${err.message}`
        );
    }
}

export async function put({
    name,
    price,
    image,
    description,
    link,
    categoryId,
    languageId,
}: {
    name: string;
    price: number;
    image?: string;
    description?: string;
    link: string;
    categoryId: string;
    languageId: string;
}) {
    await singleSQLQuery({
        query: async () => {
            if (image) {
                return await sql.query(
                    `
                    WITH new_dish AS (
                        INSERT INTO dishes (price, category_id, image, is_deleted)
                        VALUES ($1, $2, $3, false)
                        RETURNING id
                    )
                    INSERT INTO dish_translations (dish_id, language_id, name, link, description)
                    SELECT id, $4, $5, $6, $7
                    FROM new_dish;
                `,
                    [
                        price,
                        categoryId,
                        image,
                        languageId,
                        name,
                        link,
                        description || "",
                    ]
                );
            }
            return await sql.query(
                `
                WITH new_dish AS (
                    INSERT INTO dishes (price, category_id, image, is_deleted)
                    VALUES ($1, $2, NULL, false)
                    RETURNING id
                )
                INSERT INTO dish_translations (dish_id, language_id, name, link, description)
                SELECT id, $3, $4, $5, $6
                FROM new_dish;
            `,
                [price, categoryId, languageId, name, link, description || ""]
            );
        },
        notFoundMessage: "No se pudo crear el plato",
        dataBaseMessage: "Error al crear plato",
    });
}

export async function putTranslation({
    id,
    name,
    languageId,
    link,
    description,
}: {
    id: string;
    name: string;
    languageId: string;
    link: string;
    description?: string;
}) {
    await singleSQLQuery({
        query: async () => {
            return await sql.query(
                `
                INSERT INTO dish_translations (dish_id, language_id, name, link, description)
                VALUES ($1, $2, $3, $4, $5)
            `,
                [id, languageId, name, link, description]
            );
        },
        notFoundMessage: "No se pudo crear la traducción del plato",
        dataBaseMessage: "Error al crear traducción del plato",
    });
}

export async function updateTranslation(
    id: string | number,
    fields: Record<string, unknown>
) {
    await singleSQLQuery({
        query: async () => {
            const { queryString, values } = paramJoin(fields);
            return await sql.query(
                `
                UPDATE dish_translations
                SET ${queryString}
                WHERE id = $${values.length + 1}
            `,
                [...values, id]
            );
        },
        notFoundMessage: "Traducción del plato no encontrada",
        dataBaseMessage: "Error al actualizar la traducción del plato",
    });
}

export async function update(
    id: string | number,
    fields: Record<string, unknown>
) {
    await singleSQLQuery({
        query: async () => {
            const { queryString, values } = paramJoin(fields);
            return await sql.query(
                `
                UPDATE dishes
                SET ${queryString}
                WHERE id = $${values.length + 1}
            `,
                [...values, id]
            );
        },
        notFoundMessage: "Plato no encontrado",
        dataBaseMessage: "Error al actualizar el plato",
    });
}

export async function del(id: string | number) {
    await singleSQLQuery({
        query: async () => {
            return await sql.query(
                `
                DELETE FROM dishes
                WHERE id = $1
            `,
                [id]
            );
        },
        notFoundMessage: "Plato no encontrado",
        dataBaseMessage: "Error al eliminar el plato",
    });
}
