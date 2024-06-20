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
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Table({
    tableName,
    rowCount,
    columns,
    rows,
    tableLoading,
    redirectLoadData,
    pathname,
    redirect,

    page,
    size,
    sortBy,
    sortOrder,
    filterField,
    filterOperator,
    filterValue,
}: {
    tableName: string;
    rowCount: number;
    columns: GridColDef[];
    rows: any[];
    tableLoading: boolean;
    redirectLoadData: (params: Record<string, string | number>) => void;
    pathname: string;
    redirect: (p: string) => void;

    page?: number;
    size?: number;
    sortBy?: string;
    sortOrder?: string;
    filterField: string;
    filterOperator: string;
    filterValue?: string;
}) {
    const [selectedRow, setSelectedRow] = useState<string | number | null>(
        null
    );

    function onPaginationModelChange(model: GridPaginationModel) {
        redirectLoadData({
            page: model.page,
            size: model.pageSize,
        });
    }
    function onRowSelectionModelChange(
        rowSelectionModel: GridRowSelectionModel
    ) {
        setSelectedRow(rowSelectionModel[0]);
    }

    function onFilterModelChange(args: GridFilterModel) {
        if (args.items.length > 0) {
            redirectLoadData({
                filterField: args.items[0].field,
                filterOperator: args.items[0].operator,
                filterValue: args.items[0].value,
            });
        }
    }
    function onSortModelChange(args: GridSortModel) {
        if (args.length > 0) {
            redirectLoadData({
                sortBy: args[0].field,
                sortOrder: args[0].sort || "asc",
            });
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
                            onClick={() => redirect(`${pathname}/agregar`)}
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
                                        redirect(
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
                                    onClick={() =>
                                        redirectLoadData({
                                            delete: selectedRow,
                                        })
                                    }
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
                sortModel={[
                    {
                        field: sortBy || "",
                        sort: sortOrder === "asc" ? "asc" : "desc",
                    },
                ]}
                filterModel={{
                    items: [
                        {
                            field: filterField,
                            operator: filterOperator,
                            value: filterValue,
                        },
                    ],
                }}
                paginationModel={{ page: page || 0, pageSize: size || 25 }}
                pageSizeOptions={[5, 10, 25, 50]}
                onSortModelChange={onSortModelChange}
                onPaginationModelChange={onPaginationModelChange}
                onRowSelectionModelChange={onRowSelectionModelChange}
                onFilterModelChange={onFilterModelChange}
            />
        </>
    );
}
