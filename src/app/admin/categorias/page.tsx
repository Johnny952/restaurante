"use client";
import { Paper } from "@mui/material";
import LinkBreadcrumbs from "@/components/link-breadcrumbs";
import BaseTable from "../components/base-table";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import useSnackStore from "@/store/snackbar-store";
import pathWithQueries from "@/helpers/path-with-queries";
import { GridColDef } from "@mui/x-data-grid";
import filterOperators from "../components/base-table/filter-operators";
import { CategoryTable } from "@/app/api/categories/index.types";
import { getCount, list } from "@/app/api/categories/get";
import DeleteCategoryDialog from "./components/delete-dialog";

const breadcrumbs = [
    {
        name: "Home",
        link: "/admin",
    },
    {
        name: "Categorías",
    },
];

const columns: GridColDef[] = [
    {
        field: "id",
        headerName: "ID",
        width: 100,
        filterOperators,
    },
    {
        field: "name",
        headerName: "Nombre",
        width: 150,
        filterOperators,
    },
    {
        field: "restaurant_name",
        headerName: "Restaurante",
        width: 150,
        filterOperators,
    },
    {
        field: "language",
        headerName: "Lenguaje",
        width: 150,
        filterOperators,
    },
    {
        field: "link",
        headerName: "Enlace",
        width: 150,
        filterOperators,
    },
    {
        field: "parent",
        headerName: "Categoría Padre",
        width: 150,
        filterOperators,
    },
    {
        field: "image",
        headerName: "Imagen",
        width: 150,
        filterOperators: [],
    },
];

export default function AdminCategoriesPage(props: {
    searchParams: {
        page?: string;
        size?: string;
        delete?: string;
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
    const {
        sortBy,
        sortOrder,
        filterField,
        filterOperator,
        filterValue,
        delete: del,
    } = props.searchParams;

    const [rowCount, setRowCount] = useState<number>(0);
    const [rows, setRows] = useState<CategoryTable[]>([]);
    const [tableLoading, setTableLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();
    const snackError = useSnackStore((state) => state.setOpenError);

    useEffect(() => {
        const fetchData = async () => {
            setTableLoading(true);
            return Promise.all([
                list({
                    page,
                    size,
                    sortBy,
                    sortOrder,
                    filterField,
                    filterOperator,
                    filterValue,
                }),
                getCount(filterField, filterOperator, filterValue),
            ]);
        };

        fetchData()
            .then(([dataRows, count]) => {
                setRowCount(parseInt(count.count, 10));
                setRows(dataRows);
                setTableLoading(false);
            })
            .catch((error) => {
                snackError(`Ocurrió un error: ${error.toString()}`);
                setTableLoading(false);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        filterField,
        filterOperator,
        filterValue,
        page,
        size,
        sortBy,
        sortOrder,
        del,
    ]);

    function redirectLoadData(params: Record<string, string | number>) {
        router.push(
            pathWithQueries(pathname, {
                page,
                size,
                filterField,
                filterOperator,
                filterValue,
                sortBy,
                sortOrder,
                ...params,
            })
        );
    }

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
                <BaseTable
                    tableName="Categorías"
                    rowCount={rowCount}
                    columns={columns}
                    rows={rows}
                    tableLoading={tableLoading}
                    redirectLoadData={redirectLoadData}
                    pathname={pathname}
                    redirect={(path: string) => router.push(path)}
                    page={page}
                    size={size}
                    sortBy={sortBy}
                    sortOrder={sortOrder}
                    filterField={filterField || "id"}
                    filterOperator={filterOperator || "contains"}
                    filterValue={filterValue}
                />
                <DeleteCategoryDialog
                    open={Boolean(del) && del !== ""}
                    onClose={() => redirectLoadData({})}
                    selected={del || ""}
                />
            </Paper>
        </div>
    );
}
