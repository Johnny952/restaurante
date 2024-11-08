import { filterOptions, FilterParams } from "../models/pagination";
import { RestaurantsLanguagesType } from "../models/restaurants-languages";
import buildQuery from "../util/query-builder";
import { list as listService, listCount, put as putService } from "../repositories/restaurants-languages";

const fieldMap = {
    restaurant: 'restaurant_id',
    language: 'language_id',
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
    let filter: FilterParams<keyof RestaurantsLanguagesType>;
    if (
        filterField &&
        filterOperator &&
        filterValue &&
        filterValue !== "" &&
        filterValue !== "undefined" &&
        Object.values(filterOptions).includes(filterOperator)
    ) {
        filter = {
            field: fieldMap[filterField as keyof typeof fieldMap] as keyof RestaurantsLanguagesType,
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
                    by: fieldMap[sortBy as keyof typeof fieldMap] as keyof RestaurantsLanguagesType,
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
        restaurantsLanguages: data[0],
        count: data[1],
    };
}

export async function put(args: {
    restaurant_id: string;
    language_id: string;
}) {
    return buildQuery(() => putService(args));
}