import { LanguageType } from "../models/language";
import { filterOptions, FilterParams } from "../models/pagination";
import buildQuery from "../util/query-builder";
import { list as listService, listCount, del as delService, put as putService, getAll as getAllService, getLanguagesByRestaurant, getAllByRestaurantLink as getAllByRestaurantLinkService } from "../repositories/language";

export async function getByRestaurant(id: number) {
    return buildQuery(() => getLanguagesByRestaurant(id));
}

export async function getAllByRestaurantLink(link: string) {
    return buildQuery(() => getAllByRestaurantLinkService(link));
}

export async function getAll() {
    return buildQuery(() => getAllService())
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
    let filter: FilterParams<keyof LanguageType>;
    if (
        filterField &&
        filterOperator &&
        filterValue &&
        filterValue !== "" &&
        filterValue !== "undefined" &&
        Object.values(filterOptions).includes(filterOperator)
    ) {
        filter = {
            field: filterField.toLowerCase().trim() as keyof LanguageType,
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
                    by: sortBy.toLowerCase() as keyof LanguageType,
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
        languages: data[0],
        count: data[1],
    };
}

export async function del(id: string) {
    return buildQuery(() => delService(id));
}

export async function put(args: {
    code: string;
    name: string;
}) {
    return buildQuery(() =>
        putService(args)
    );
}