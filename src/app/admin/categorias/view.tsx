"use client";
import LinkBreadcrumbs from "@/components/link-breadcrumbs";
import { Paper } from "@mui/material";
import BaseTable from "../components/base-table";
import DeleteCategoryDialog from "./components/delete-dialog";
import filterOperators from "../components/base-table/filter-operators";
import { GridColDef } from "@mui/x-data-grid";
import { CategoryType } from "@/lib/models/categories";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useSWR, { SWRConfig } from "swr";
import { enqueueSnackbar } from "notistack";
import { softDelete } from "@/lib/services/category";
import Loader from "../components/loader";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

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
        field: "category_name",
        headerName: "Nombre",
        width: 150,
        filterOperators,
    },
    {
        field: "is_deleted",
        headerName: "Eliminado",
        width: 150,
        filterOperators,
    },
    {
        field: "restaurant_link",
        headerName: "Restaurante",
        width: 150,
        filterOperators,
    },
    {
        field: "language_code",
        headerName: "Lenguaje",
        width: 150,
        filterOperators,
    },
    {
        field: "category_link",
        headerName: "Enlace",
        width: 150,
        filterOperators,
    },
    {
        field: "parent_category_link",
        headerName: "Categoría Padre",
        width: 150,
        filterOperators,
    },
    {
        field: "category_image",
        headerName: "Imagen",
        width: 150,
        filterOperators: [],
    },
];

interface Props {
    initialData: {
        categories: CategoryType[];
        count: number;
    };
    initialPage?: number;
    initialSize?: number;
    initialSortBy?: string;
    initialSortOrder?: string;
    initialFilterField?: string;
    initialFilterOperator?: string;
    initialFilterValue?: string;
    del?: string;
}

export default function AdminCategoriesView(props: Props) {
    const {
        initialData,
        initialPage,
        initialSize,
        initialSortBy,
        initialSortOrder,
        initialFilterField,
        initialFilterOperator,
        initialFilterValue,
        del,
    } = props;
    const [page, setPage] = useState<number>(initialPage || 0);
    const [size, setSize] = useState<number>(initialSize || 10);
    const [sortBy, setSortBy] = useState(initialSortBy);
    const [sortOrder, setSortOrder] = useState(initialSortOrder);
    const [filterField, setFilterField] = useState(initialFilterField);
    const [filterOperator, setFilterOperator] = useState(initialFilterOperator);
    const [filterValue, setFilterValue] = useState(initialFilterValue);
    const [tableLoading, setTableLoading] = useState(true);

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const { data, error, mutate } = useSWR<
        { categories: CategoryType[]; count: number } | { error: string }
    >(
        `/api/categories?page=${page}&size=${size}&sortBy=${sortBy}&sortOrder=${sortOrder}&filterField=${filterField}&filterOperator=${filterOperator}&filterValue=${filterValue}`,
        fetcher,
        { fallbackData: initialData }
    );

    useEffect(() => {
        setTableLoading(false);
    }, []);

    useEffect(() => {
        const current = new URLSearchParams(searchParams.toString());
        if (page !== 0) current.set("page", page.toString());
        else current.delete("page");
        if (size !== 10) current.set("size", size.toString());
        else current.delete("size");
        if (sortBy) current.set("sortBy", sortBy);
        else current.delete("sortBy");
        if (sortOrder) current.set("sortOrder", sortOrder);
        else current.delete("sortOrder");
        if (filterField) current.set("filterField", filterField);
        else current.delete("filterField");
        if (filterOperator) current.set("filterOperator", filterOperator);
        else current.delete("filterOperator");
        if (filterValue) current.set("filterValue", filterValue);
        else current.delete("filterValue");

        const search = current.toString();
        const query = search ? `?${search}` : "";
        router.push(`${pathname}${query}`, { scroll: false });
    }, [page, size, sortBy, sortOrder, filterField, filterOperator, filterValue, pathname, router, searchParams]);

    const updateState = (newState: Partial<typeof props>) => {
        if ("initialPage" in newState) setPage(newState.initialPage || 0);
        if ("initialSize" in newState) setSize(newState.initialSize || 10);
        if ("initialSortBy" in newState)
            setSortBy(newState.initialSortBy || "");
        if ("initialSortOrder" in newState)
            setSortOrder(newState.initialSortOrder || "");
        if ("initialFilterField" in newState)
            setFilterField(newState.initialFilterField || "");
        if ("initialFilterOperator" in newState)
            setFilterOperator(newState.initialFilterOperator || "");
        if ("initialFilterValue" in newState)
            setFilterValue(newState.initialFilterValue || "");
    };

    const deleteCategory = async (id: string) => {
        const result = await softDelete(id);
        if (!(result && "error" in result)) {
            mutate(); // Re-fetch data after successful deletion
            enqueueSnackbar({
                message: "Categoría eliminada",
                variant: "error",
            });
        } else {
            enqueueSnackbar({
                message: result.error,
                variant: "error",
            });
        }
        return result;
    };

    if (error || !data || "error" in data)
        return <div>Error al cargar los datos</div>;
    if (!data) return <Loader />;
    const { categories, count } = data;

    return (
        <SWRConfig
            value={{
                fallback: {
                    "/api/categories": initialData,
                },
            }}
        >
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
                    rowCount={count}
                    columns={columns}
                    rows={categories}
                    tableLoading={tableLoading}
                    page={page}
                    size={size}
                    sortBy={sortBy}
                    sortOrder={sortOrder}
                    filterField={filterField || "id"}
                    filterOperator={filterOperator || "contains"}
                    filterValue={filterValue}
                    onPageChange={(newPage) =>
                        updateState({ initialPage: newPage })
                    }
                    onSizeChange={(newSize) =>
                        updateState({ initialSize: newSize })
                    }
                    onSortByChange={(newSortBy) =>
                        updateState({ initialSortBy: newSortBy })
                    }
                    onSortOrderChange={(newSortOrder) =>
                        updateState({ initialSortOrder: newSortOrder })
                    }
                    onFilterFieldChange={(newFilterField) =>
                        updateState({ initialFilterField: newFilterField })
                    }
                    onFilterOperatorChange={(newFilterOperator) =>
                        updateState({
                            initialFilterOperator: newFilterOperator,
                        })
                    }
                    onFilterValueChange={(newFilterValue) =>
                        updateState({ initialFilterValue: newFilterValue })
                    }
                />
                <DeleteCategoryDialog
                    open={Boolean(del) && del !== ""}
                    selected={del || ""}
                    deleteCategory={deleteCategory}
                />
            </Paper>
        </SWRConfig>
    );
}
