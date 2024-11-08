"use server"

import { CategoryType } from "../models/categories";
import { filterOptions, FilterParams } from "../models/pagination";
import buildQuery from "../util/query-builder";
import {
    get,
    getAll,
    list as listService,
    listCount,
    put as putService,
    putTranslation as putTranslationService,
    update,
    updateTranslation,
    del as delService,
    getAllChildren as getAllChildrenService,
} from "../repositories/category";

export async function getByLink(
    restaurantLink: string,
    languageCode: string,
    categoryLink: string
) {
    return buildQuery(() =>
        get({
            restaurant_link: restaurantLink,
            language_code: languageCode,
            category_link: categoryLink,
        })
    );
}

export async function getById(id: string) {
    return buildQuery(() => get({ id: parseInt(id, 10) }));
}


export async function getAllParentsByRestaurantLanguage(
    restaurantLink: string,
    languageCode: string
) {
    return buildQuery(() =>
        getAll({
            restaurant_link: restaurantLink,
            language_code: languageCode,
            parent_category_id: undefined,
        })
    );
}

export async function getAllChildren(
    restaurantId: string,
    languageId: string,
) {
    return buildQuery(() =>
        getAllChildrenService({
            restaurantId,
            language_id: languageId,
        })
    );
}

export async function getAllChildrenByParentLink(
    restaurantLink: string,
    languageCode: string,
    categoryLink: string
) {
    return buildQuery(() =>
        getAll({
            restaurant_link: restaurantLink,
            language_code: languageCode,
            parent_category_link: categoryLink,
            is_deleted: false,
        })
    );
}

export async function list({
    page = 0,
    size = 25,
    sortBy = "category_name",
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
    let filter: FilterParams<keyof CategoryType>;
    if (
        filterField &&
        filterOperator &&
        filterValue &&
        filterValue !== "" &&
        filterValue !== "undefined" &&
        Object.values(filterOptions).includes(filterOperator)
    ) {
        filter = {
            field: filterField.toLowerCase().trim() as keyof CategoryType,
            operator: filterOperator,
            value: filterValue,
        };
    }

    const data = await buildQuery(() =>
        Promise.all([
            listService({
                pagination: {
                    page,
                    size,
                },
                sort: {
                    by: sortBy.toLowerCase() as keyof CategoryType,
                    order:
                        sortOrder.toLowerCase().trim() === "desc"
                            ? "DESC"
                            : "ASC",
                },
                filter,
            }),
            listCount(filter),
        ])
    );

    if ("error" in data) {
        return data;
    }

    return {
        categories: data[0],
        count: data[1],
    };
}

export async function put(
    name: string,
    restaurantId: number,
    languageId: string,
    link: string,
    parentId: string,
    image: string
) {
    const response = await buildQuery(() =>
        putService({
            name,
            restaurantId,
            languageId,
            link,
            parentId: parentId === "" ? undefined : parentId,
            image,
        })
    );
    return response;
}

export async function putTranslation(
    id: string,
    name: string,
    languageId: string,
    link: string,
) {
    return buildQuery(() => putTranslationService({
        id,
        name,
        languageId,
        link,
    }))
}

export async function del(id: string) {
    return buildQuery(() => delService(id));
}

export async function softDelete(id: string) {
    return buildQuery(() => update(id, {
        is_deleted: true
    }));
}

export async function updateNameLink(
    id: string,
    name: string,
    link: string
) {
    return buildQuery(() =>
        updateTranslation(id, {
            name,
            link,
        })
    );
}

export async function updateParent(
    id: string,
    parent: string
) {
    return buildQuery(() =>
        update(id, {
            parent_id: parseInt(parent, 10),
        })
    );
}

export async function updateImage(id: string, image: string) {
    return buildQuery(() =>
        update(id, {
            image: image,
        })
    );
}

export async function updateRestaurantLanguage(
    id: string,
    translationId: string,
    restaurantId: string,
    languageId: string
) {
    return buildQuery(() =>
        Promise.all([
            update(id, {
                restaurant_id: parseInt(restaurantId, 10),
            }),
            updateTranslation(translationId, {
                language_id: parseInt(languageId, 10),
            }),
        ])
    );
}
