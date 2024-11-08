"use client";
import LinkBreadcrumbs from "@/components/link-breadcrumbs";
import Paper from "@mui/material/Paper";
import BaseTable from "../components/base-table";
import filterOperators from "../components/base-table/filter-operators";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import DeleteDialog from "./components/delete-dialog";
import useSWR, { SWRConfig } from "swr";
import { softDelete } from "@/lib/services/dishes";
import Loader from "../components/loader";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { DishType } from "@/lib/models/dishes";
import { deleteImage } from "@/app/api/upload/delete-image";
import useLoadStore from "@/store/load-store";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const breadcrumbs = [
    {
        name: "Home",
        link: "/admin",
    },
    {
        name: "Platos",
    },
];

const columns: GridColDef[] = [
    {
        field: "dish_name",
        headerName: "Nombre",
        width: 150,
        filterOperators,
    },
    {
        field: "dish_link",
        headerName: "Enlace",
        width: 150,
        filterOperators,
    },
    {
        field: "dish_price",
        headerName: "Precio",
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
        field: "category_name",
        headerName: "Categoría",
        width: 150,
        filterOperators,
    },
    {
        field: "dish_description",
        headerName: "Descripción",
        width: 150,
        filterOperators,
    },
    {
        field: "dish_image",
        headerName: "Imagen",
        width: 300,
        filterable: false,
    },
];

interface Props {
    initialData: {
        dishes: DishType[];
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

export default function AdminDishesView(props: Props) {
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

    const setLoading = useLoadStore((state) => state.setLoading);

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const { data, error, mutate } = useSWR<
        { dishes: DishType[]; count: number } | { error: string }
    >(
        `/api/dishes?page=${page}&size=${size}&sortBy=${sortBy}&sortOrder=${sortOrder}&filterField=${filterField}&filterOperator=${filterOperator}&filterValue=${filterValue}`,
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

    const deleteDish = async (id: string, url: string) => {
        setLoading(true);
        let promises = [deleteImage(url), softDelete(id)];
        const result = await Promise.all(promises);
        if (!(result[1] && "error" in result[1])) {
            mutate(); // Re-fetch data after successful deletion
        } else {
            enqueueSnackbar({
                message: result[1].error,
                variant: "error",
            });
        }
        setLoading(false);
        return result[1];
    };

    if (error || !data || "error" in data)
        return <div>Error al cargar los datos</div>;
    if (!data) return <Loader />;
    const { dishes, count } = data;
    const selectedDish = dishes.find((r) => r.id.toString() === del);

    return (
        <SWRConfig
            value={{
                fallback: {
                    "/api/dishes": initialData,
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
                    tableName="Platos"
                    rowCount={count}
                    columns={columns}
                    rows={dishes}
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
                {selectedDish ? (
                    <DeleteDialog
                        open={Boolean(del) && del !== ""}
                        deleteDish={deleteDish}
                        dish={selectedDish}
                    />
                ) : null}
            </Paper>
        </SWRConfig>
    );
}
