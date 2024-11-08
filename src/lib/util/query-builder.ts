import errors from "../errors";

export default async function buildQuery<T>(query: () => Promise<T>) {
    try {
        const response = await query();
        return response;
    } catch (error) {
        if (error instanceof errors.NotFoundError) {
            return { error: error.message, status: 404 };
        }
        if (error instanceof errors.DatabaseError) {
            return { error: error.message, status: 500 };
        }
        const err = error as Error;
        return { error: err.message, status: 500 };
    }
}
