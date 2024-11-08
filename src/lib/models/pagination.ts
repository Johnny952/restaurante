export const sortOptions = {
    desc: "DESC",
    asc: "ASC",
} as const;

export const filterOptions = {
    contains: "contains",
    equals: "equals",
    startsWith: "startsWith",
    endsWith: "endsWith",
};

export interface PaginationParams {
    page: number;
    size: number;
}
export interface SortParams<T extends string> {
    by: T;
    order: (typeof sortOptions)[keyof typeof sortOptions];
}
export interface FilterParams<T extends string> {
    field: T;
    operator: (typeof filterOptions)[keyof typeof filterOptions];
    value: string;
}
export type TableParams<T extends string> = {
    pagination: PaginationParams;
    sort: SortParams<T>;
    filter?: FilterParams<T>;
};
