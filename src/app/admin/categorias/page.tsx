import { list } from "@/lib/services/category";
import AdminCategoriesView from "./view";

export default async function AdminCategoriesPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const page = searchParams.page
        ? parseInt(searchParams.page as string, 10)
        : 0;
    const size = searchParams.size
        ? parseInt(searchParams.size as string, 10)
        : 10;
    const sortBy = (searchParams.sortBy as string) || "category_name";
    const sortOrder = (searchParams.sortOrder as string) || "ASC";
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

    if ("error" in initialData) {
        return <div>{initialData.error}</div>;
    }

    return (
        <AdminCategoriesView
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
