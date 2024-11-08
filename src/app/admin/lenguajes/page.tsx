import { list } from "@/lib/services/language";
import AdminLanguagesView from "./view";

export default async function AdminLanguagesPage({
    searchParams
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const page = searchParams.page ? parseInt(searchParams.page as string, 10) : 0;
    const size = searchParams.size ? parseInt(searchParams.size as string, 10) : 10;
    const sortBy = searchParams.sortBy as string || 'id';
    const sortOrder = searchParams.sortOrder as string || 'ASC';
    const filterField = searchParams.filterField as string;
    const filterOperator = searchParams.filterOperator as string;
    const filterValue = searchParams.filterValue as string;
    const del = searchParams.delete as string;

    const initialData = await list({
        page,
        size,
        sortBy,
        sortOrder,
        filterField,
        filterOperator,
        filterValue,
    });

    if ('error' in initialData) {
        return {
            notFound: true
        };
    }

    return (
        <AdminLanguagesView
            initialData={initialData}
            initialPage={page}
            initialSize={size}
            initialSortBy={sortBy}
            initialSortOrder={sortOrder}
            initialFilterField={filterField}
            initialFilterOperator={filterOperator}
            initialFilterValue={filterValue}
            del={del}
        />
    );
}