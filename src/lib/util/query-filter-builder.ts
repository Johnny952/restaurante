import { FilterParams } from "../models/pagination";

export default function buildQueryFilter<T extends string>({
    field,
    operator,
    value,
}: FilterParams<T>) {
    switch (operator) {
        case "contains":
            return `WHERE (${field}) LIKE '${"%" + value + "%"}'`;
        case "equals":
            return `WHERE (${field})='${value}'`;
        case "startsWith":
            return `WHERE (${field}) LIKE '${value + "%"}'`;
        case "endsWith":
            return `WHERE (${field}) LIKE '${"%" + value}'`;
        default:
            return "";
    }
}
