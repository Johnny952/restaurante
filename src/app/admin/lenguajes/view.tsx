"use client";
import { Paper } from "@mui/material";
import LinkBreadcrumbs from "@/components/link-breadcrumbs";
import BaseTable from "../components/base-table";
import { useEffect, useState } from "react";
import { LanguageType } from "@/lib/models/language";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import DeleteLanguageDialog from "./components/delete-dialog";
import { GridColDef } from "@mui/x-data-grid";
import filterOperators from "../components/base-table/filter-operators";
import useSWR, { SWRConfig } from "swr";
import { enqueueSnackbar } from "notistack";
import { del as deleteService } from "@/lib/services/language";
import Loader from "../components/loader";

const breadcrumbs = [
    {
        name: "Home",
        link: "/admin",
    },
    {
        name: "Lenguajes",
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
        field: "code",
        headerName: "Código",
        width: 100,
        filterOperators,
    },
    {
        field: "name",
        headerName: "Nombre",
        width: 150,
        filterOperators,
    },
];

interface Props {
    initialData: {
        languages: LanguageType[];
        count: number;
    };
    initialPage: number;
    initialSize: number;
    initialSortBy: string;
    initialSortOrder: string;
    initialFilterField?: string;
    initialFilterOperator?: string;
    initialFilterValue?: string;
    del?: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function AdminLanguagesView(props: Props) {
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
        { languages: LanguageType[]; count: number } | { error: string }
    >(
        `/api/languages?page=${page}&size=${size}&sortBy=${sortBy}&sortOrder=${sortOrder}&filterField=${filterField}&filterOperator=${filterOperator}&filterValue=${filterValue}`,
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

    const deleteLanguage = async (id: string) => {
        const result = await deleteService(id);
        if (!(result && "error" in result)) {
            mutate(); // Re-fetch data after successful deletion
        } else {
            enqueueSnackbar({
                message: result.error,
                variant: "error",
            });
        }
        return result;
    };

    if (!data || "error" in data) return <div>Error al cargar los datos</div>;
    if (!data) return <Loader />;
    const { languages, count } = data;

    return (
        <SWRConfig
            value={{
                fallback: {
                    "/api/languages": initialData,
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
                    tableName="Lenguajes"
                    rowCount={count}
                    columns={columns}
                    rows={languages}
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
                <DeleteLanguageDialog
                    open={Boolean(del) && del !== ""}
                    language={languages.find(
                        (lang) => lang.id.toString() === del
                    )}
                    deleteLanguage={deleteLanguage}
                />
            </Paper>
        </SWRConfig>
    );
}
