import {
    getCountRestaurantes,
    listRestaurantes,
} from "@/app/api/restaurantes/get-restaurante";
import { Paper } from "@mui/material";
import Table from "./components/table";
import LinkBreadcrumbs from "@/components/link-breadcrumbs";

const breadcrumbs = [
    {
        name: "Home",
        link: "/admin",
    },
    {
        name: "Restaurantes",
    },
];

export default async function AdminRestaurantePage(props: {
    searchParams: {
        page?: string;
        size?: string;
        delete?: string;
        edit?: string;
        add?: string;
        sortBy?: string;
        sortOrder?: string;
        filterField?: string;
        filterOperator?: string;
        filterValue?: string;
    };
}) {
    const page = props.searchParams.page
        ? parseInt(props.searchParams.page)
        : undefined;
    const size = props.searchParams.size
        ? parseInt(props.searchParams.size)
        : undefined;
    const add = Boolean(props.searchParams.add);
    const {
        sortBy,
        sortOrder,
        edit,
        filterField,
        filterOperator,
        filterValue,
        delete: del,
    } = props.searchParams;

    const [dataRows, count] = await Promise.all([
        listRestaurantes({
            page,
            size,
            sortBy,
            sortOrder,
            filterField,
            filterOperator,
            filterValue,
        }),
        getCountRestaurantes(filterField, filterOperator, filterValue),
    ]);
    return (
        <div>
            <LinkBreadcrumbs breadcrumbs={breadcrumbs} />

            <Paper
                elevation={0}
                sx={{
                    mt: "20px",
                    p: "20px",
                    border: "1px solid rgba(0, 0, 0, 0.12)",
                    color: "rgb(114, 119, 122)",
                }}
            >
                <Table
                    rows={dataRows}
                    rowCount={parseInt(count.count, 10)}
                    page={page}
                    size={size}
                    edit={edit}
                    add={add}
                    sortBy={sortBy}
                    sortOrder={sortOrder}
                    filterField={filterField}
                    filterOperator={filterOperator}
                    filterValue={filterValue}
                    delete={del}
                />
            </Paper>
        </div>
    );
}
