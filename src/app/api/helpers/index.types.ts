export interface PaginationParams {
    page?: number;
    size?: number;
}
export interface SortParams {
    sortBy?: string;
    sortOrder?: string;
}
export interface FilterParams {
    filterField?: string;
    filterOperator?: string;
    filterValue?: string;
}
export type TableParams = PaginationParams & SortParams & FilterParams;
