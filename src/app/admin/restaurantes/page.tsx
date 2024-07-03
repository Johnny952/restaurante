"use client";
import { Paper } from "@mui/material";
import LinkBreadcrumbs from "@/components/link-breadcrumbs";
import { GridColDef } from "@mui/x-data-grid";
import filterOperators from "../components/base-table/filter-operators";
import { useEffect, useState } from "react";
import { RestaurantInterface } from "@/app/api/restaurants/index.types";
import { usePathname, useRouter } from "next/navigation";
import useSnackStore from "@/store/snackbar-store";
import { getCount, list } from "@/app/api/restaurants/get";
import pathWithQueries from "@/helpers/path-with-queries";
import BaseTable from "../components/base-table";
import DeleteRestauranteDialog from "./components/delete-restaurante-dialog";

const breadcrumbs = [
    {
        name: "Home",
        link: "/admin",
    },
    {
        name: "Restaurantes",
    },
];

const columns: GridColDef[] = [
    {
        field: "name",
        headerName: "Nombre",
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
        field: "image",
        headerName: "Imagen",
        width: 300,
        filterable: false,
    },
    {
        field: "background",
        headerName: "Fondo",
        width: 300,
        filterable: false,
    },
];

export default function AdminRestaurantePage(props: {
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
    const [rows, setRows] = useState<RestaurantInterface[]>([]);
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
                    tableName="Restaurantes"
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
                    filterField={filterField || "name"}
                    filterOperator={filterOperator || "contains"}
                    filterValue={filterValue}
                />
                <DeleteRestauranteDialog
                    open={Boolean(del) && del !== ""}
                    onClose={() => redirectLoadData({})}
                    selected={del || ""}
                />
            </Paper>
        </div>
    );
}
