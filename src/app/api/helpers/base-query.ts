/**
 * Return SQL filter depending on filters parameters
 * @param filterField - Field to filter data
 * @param filterOperator - Filter operation
 * @param filterValue - Filter value
 * @returns Where sql query
 */
export default function baseQuery(
    filterField?: string,
    filterOperator?: string,
    filterValue?: string
) {
    let query: string = "";
    if (
        filterField &&
        filterOperator &&
        filterValue &&
        filterValue !== "" &&
        filterValue !== "undefined"
    ) {
        switch (filterOperator) {
            case "contains":
                query = `WHERE (${filterField}) LIKE '${"%" + filterValue + "%"}'`;
                break;
            case "equals":
                query = `WHERE (${filterField})='${filterValue}'`;
                break;
            case "startsWith":
                query = `WHERE (${filterField}) LIKE '${filterValue + "%"}'`;
                break;
            case "endsWith":
                query = `WHERE (${filterField}) LIKE '${"%" + filterValue}'`;
                break;
            default:
                query = "";
                break;
        }
    }
    return query;
}
