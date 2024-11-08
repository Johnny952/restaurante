import { FilterParams, filterOptions } from "../models/pagination";
import { RestaurantType } from "../models/restaurant";
import {
    get,
    list as listService,
    listCount,
    put as putService,
    update,
    del as delService,
    getAll as getAllService,
} from "../repositories/restaurant";
import buildQuery from "../util/query-builder";

export async function getByLink(link: string) {
    return buildQuery(() => get({ link }));
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
    let filter: FilterParams<keyof RestaurantType>;
    if (
        filterField &&
        filterOperator &&
        filterValue &&
        filterValue !== "" &&
        filterValue !== "undefined" &&
        Object.values(filterOptions).includes(filterOperator)
    ) {
        filter = {
            field: filterField.toLowerCase().trim() as keyof RestaurantType,
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
                    by: sortBy.toLowerCase() as keyof RestaurantType,
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
        restaurants: data[0],
        count: data[1],
    };
}

export async function getAll() {
    return buildQuery(() => getAllService());
}

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
    return buildQuery(() =>
        putService({
            name,
            link,
            logo,
            background,
        })
    );
}

export async function updateName(id: string, name: string, link: string) {
    return buildQuery(() => update(id, { name, link }));
}

export async function updateLogo(id: string, logo: string) {
    return buildQuery(() => update(id, { logo }));
}

export async function updateBackground(id: string, background?: string | null) {
    return buildQuery(() => update(id, { background_image: background }));
}

export async function softDelete(id: string) {
    return buildQuery(() => update(id, { is_deleted: true }));
}

export async function del(id: string) {
    return buildQuery(() => delService(id));
}
