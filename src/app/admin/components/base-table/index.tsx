"use client";
import {
    AppBar,
    Box,
    IconButton,
    Toolbar,
    Tooltip,
    Typography,
} from "@mui/material";
import {
    DataGrid,
    GridColDef,
    GridFilterModel,
    GridPaginationModel,
    GridRowSelectionModel,
    GridSortModel,
} from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { navigateWithNewParam } from "@/helpers/navigate-with-new-params";

export default function Table({
    tableName,
    rowCount,
    columns,
    rows,
    tableLoading,

    page = 0,
    size = 10,
    sortBy = '',
    sortOrder,
    filterField,
    filterOperator,
    filterValue,
    onPageChange = () => { },
    onSizeChange = () => { },
    onSortByChange = () => { },
    onSortOrderChange = () => { },
    onFilterFieldChange = () => { },
    onFilterOperatorChange = () => { },
    onFilterValueChange = () => { },
}: {
    tableName: string;
    rowCount: number;
    columns: GridColDef[];
    rows: any[];
    tableLoading: boolean;

    page?: number;
    size?: number;
    sortBy?: string;
    sortOrder?: string;
    filterField: string;
    filterOperator: string;
    filterValue?: string;
    onPageChange?: (page: number) => void;
    onSizeChange?: (size: number) => void;
    onSortByChange?: (sortBy: string) => void;
    onSortOrderChange?: (sortOrder: string) => void;
    onFilterFieldChange?: (filterField: string) => void;
    onFilterOperatorChange?: (filterOperator: string) => void;
    onFilterValueChange?: (filterValue: string) => void;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [selectedRow, setSelectedRow] = useState<string | number | null>(null);

    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
        page,
        pageSize: size,
    });

    const [sortModel, setSortModel] = useState<GridSortModel>([
        {
            field: sortBy,
            sort: sortOrder as "asc" | "desc" | null,
        },
    ]);

    const [filterModel, setFilterModel] = useState<GridFilterModel>({
        items: [
            {
                field: filterField,
                operator: filterOperator,
                value: filterValue,
            },
        ],
    });

    useEffect(() => {
        setPaginationModel({ page, pageSize: size });
    }, [page, size]);

    useEffect(() => {
        setSortModel([{ field: sortBy, sort: sortOrder as "asc" | "desc" | null }]);
    }, [sortBy, sortOrder]);

    useEffect(() => {
        setFilterModel({
            items: [{ field: filterField, operator: filterOperator, value: filterValue }],
        });
    }, [filterField, filterOperator, filterValue]);

    function onPaginationModelChange(model: GridPaginationModel) {
        setPaginationModel(model);
        onPageChange(model.page);
        onSizeChange(model.pageSize);
    }

    function onRowSelectionModelChange(rowSelectionModel: GridRowSelectionModel) {
        setSelectedRow(rowSelectionModel[0]);
    }

    function onFilterModelChange(model: GridFilterModel) {
        setFilterModel(model);
        if (model.items.length > 0) {
            onFilterFieldChange(model.items[0].field);
            onFilterOperatorChange(model.items[0].operator);
            onFilterValueChange(model.items[0].value);
        }
    }

    function onSortModelChange(model: GridSortModel) {
        setSortModel(model);
        if (model.length > 0) {
            onSortByChange(model[0].field);
            onSortOrderChange(model[0].sort || "asc");
        }
    }

    return (
        <>
            <AppBar
                position="relative"
                sx={{ backgroundColor: "white", color: "black" }}
                elevation={0}
            >
                <Toolbar>
                    <Typography variant="h6" gutterBottom>
                        {tableName}
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Tooltip title="Agregar">
                        <IconButton
                            color="inherit"
                            onClick={() => router.push(`${pathname}/agregar`)}
                        >
                            <AddIcon />
                        </IconButton>
                    </Tooltip>
                    {selectedRow ? (
                        <>
                            <Tooltip title="Editar">
                                <IconButton
                                    color="inherit"
                                    onClick={() =>
                                        router.push(
                                            `${pathname}/${selectedRow}/editar`
                                        )
                                    }
                                >
                                    <EditIcon />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Eliminar">
                                <IconButton
                                    color="inherit"
                                    onClick={() => {
                                        navigateWithNewParam(
                                            router,
                                            searchParams,
                                            pathname,
                                            [
                                                {
                                                    name: "delete",
                                                    value: selectedRow.toString(),
                                                },
                                            ]
                                        );
                                    }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                        </>
                    ) : null}
                </Toolbar>
            </AppBar>
            <DataGrid
                loading={tableLoading}
                hideFooterSelectedRowCount
                rowCount={rowCount}
                paginationMode="server"
                sortingMode="server"
                filterMode="server"
                autoHeight
                disableMultipleRowSelection
                rows={rows}
                columns={columns}
                paginationModel={paginationModel}
                sortModel={sortModel}
                filterModel={filterModel}
                pageSizeOptions={[5, 10, 25, 50]}
                onPaginationModelChange={onPaginationModelChange}
                onSortModelChange={onSortModelChange}
                onFilterModelChange={onFilterModelChange}
                onRowSelectionModelChange={onRowSelectionModelChange}
                initialState={{
                    pagination: { paginationModel: { page, pageSize: size } },
                    sorting: { sortModel: [{ field: sortBy, sort: sortOrder as "asc" | "desc" | null }] },
                    filter: { filterModel: { items: [{ field: filterField, operator: filterOperator, value: filterValue }] } },
                }}
            />
        </>
    );
}
