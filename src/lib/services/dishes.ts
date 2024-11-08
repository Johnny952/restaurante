import { DishType } from "../models/dishes";
import { filterOptions, FilterParams } from "../models/pagination";
import { get, getAll, list as listService, listCount, put as putService, putTranslation as putTranslationService, del as delService, update, updateTranslation } from "../repositories/dishes";
import buildQuery from "../util/query-builder";

export async function getByLink(
    restaurantLink: string,
    languageCode: string,
    categoryLink: string,
    dishLink: string
) {
    return buildQuery(() =>
        get({
            restaurant_link: restaurantLink,
            language_code: languageCode,
            category_link: categoryLink,
            dish_link: dishLink,
        })
    );
}

export async function getAllByCategoryLink(
    restaurantLink: string,
    languageCode: string,
    categoryLink: string
) {
    return buildQuery(() =>
        getAll({
            restaurant_link: restaurantLink,
            language_code: languageCode,
            category_link: categoryLink,
        })
    );
}

export async function getById(id: string) {
    return buildQuery(() => get({ id: parseInt(id, 10) }));
}

export async function list({
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
    filterField?: string | null;
    filterOperator?: string | null;
    filterValue?: string | null;
}) {
    let filter: FilterParams<keyof DishType>;
    if (
        filterField &&
        filterOperator &&
        filterValue &&
        filterValue !== "" &&
        filterValue !== "undefined" &&
        Object.values(filterOptions).includes(filterOperator)
    ) {
        filter = {
            field: filterField.toLowerCase().trim() as keyof DishType,
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
                    by: sortBy.toLowerCase() as keyof DishType,
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
        dishes: data[0],
        count: data[1],
    };
}

export async function put(args:
    {
        name: string,
        price: number,
        image?: string,
        description?: string,
        link: string,
        categoryId: string,
        languageId: string
    }
) {
    return buildQuery(() =>
        putService(args)
    );
}

export async function putTranslation(
    id: string,
    name: string,
    languageId: string,
    link: string,
    description: string
) {
    return buildQuery(() =>
        putTranslationService({
            id,
            name,
            languageId,
            link,
            description,
        })
    );
}

export async function del(id: string) {
    return buildQuery(() => delService(id));
}

export async function softDelete(id: string) {
    return buildQuery(() => update(id, { is_deleted: true }));
}

export async function updateNameLink(
    id: string,
    name: string,
    link: string
) {
    return buildQuery(() => updateTranslation(id, { name, link }));
}

export async function updateImage(id: string, image: string) {
    return buildQuery(() => update(id, { image }));
}

export async function updateCategory(id: string, category: string) {
    return buildQuery(() => update(id, { category_id: parseInt(category, 10) }));
}

export async function updatePrice(id: string, price: string) {
    return buildQuery(() => update(id, { price: parseInt(price, 10) }));
}

export async function updateDescription(id: string, description: string) {
    return buildQuery(() => updateTranslation(id, { description }));
}