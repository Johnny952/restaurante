import { list } from "@/lib/services/restaurants-languages";
import AdminRestLanguagesView from "./view";

export default async function AdminRestLanguagesPage({
    searchParams
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const page = searchParams.page ? parseInt(searchParams.page as string, 10) : 0;
    const size = searchParams.size ? parseInt(searchParams.size as string, 10) : 10;
    const sortBy = searchParams.sortBy as string || 'restaurant';
    const sortOrder = searchParams.sortOrder as string || 'ASC';
    const filterField = searchParams.filterField as string;
    const filterOperator = searchParams.filterOperator as string;
    const filterValue = searchParams.filterValue as string;

    const initialData = await list({
        page,
        size,
        sortBy,
        sortOrder,
        filterField,
        filterOperator,
        filterValue,
    });
    //console.log(initialData)

    if ('error' in initialData) {
        return <div>Not Found</div>;
    }

    return (
        <AdminRestLanguagesView
            initialData={initialData}
            initialPage={page}
            initialSize={size}
            initialSortBy={sortBy}
            initialSortOrder={sortOrder}
            initialFilterField={filterField}
            initialFilterOperator={filterOperator}
            initialFilterValue={filterValue}
        />
    );
}