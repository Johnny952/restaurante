import { QueryResult } from "@vercel/postgres";
import NotFoundError from "../errors/not-found-error";
import DatabaseError from "../errors/database-error";

/**
 * Builds a single SQL query
 * @param param - The query
 * @returns The query result
 */
export async function singleSQLQuery<T extends object>({
    query,
    notFoundMessage = "Item no encontrado",
    dataBaseMessage = "Error al conseguir item",
}: {
    query: () => Promise<QueryResult<T>>;
    notFoundMessage?: string;
    dataBaseMessage?: string;
}) {
    try {
        const r = await query();
        if (r.rowCount === 0) throw new NotFoundError(notFoundMessage);
        return r.rows;
    } catch (error) {
        if (error instanceof NotFoundError) {
            throw error;
        }
        const err = error as Error;
        throw new DatabaseError(`${dataBaseMessage}: ${err.message}`);
    }
}
