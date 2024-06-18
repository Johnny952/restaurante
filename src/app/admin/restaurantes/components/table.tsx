"use client";
import {
    AppBar,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Toolbar,
    Tooltip,
    Typography,
} from "@mui/material";
import {
    DataGrid,
    GridColDef,
    GridFilterInputValue,
    GridFilterOperator,
    GridPaginationModel,
    GridRowSelectionModel,
} from "@mui/x-data-grid";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddRestauranteDialog from "./add-restaurante";
import useSnackStore from "@/store/snackbar-store";
import {
    getCountRestaurantes,
    listRestaurantes,
} from "@/app/api/restaurantes/get-restaurante";
import { RestauranteInterface } from "@/app/api/restaurantes/index.types";
import DeleteRestauranteDialog from "./delete-restaurante";
import EditRestauranteDialog from "./edit-restaurante";

const filterOperators: GridFilterOperator[] = [
    {
        label: "contiene",
        value: "contains",
        getApplyFilterFn: () => () => true,
        InputComponent: GridFilterInputValue,
    },
    {
        label: "igual",
        value: "equals",
        getApplyFilterFn: () => () => true,
        InputComponent: GridFilterInputValue,
    },
    {
        label: "comienza con",
        value: "startsWith",
        getApplyFilterFn: () => () => true,
        InputComponent: GridFilterInputValue,
    },
    {
        label: "termina con",
        value: "endsWith",
        getApplyFilterFn: () => () => true,
        InputComponent: GridFilterInputValue,
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
];

export default function Table({
    page,
    size,
    edit,
    delete: del,
    add,
    sortBy,
    sortOrder,
    filterField,
    filterOperator,
    filterValue,
}: {
    page?: number;
    size?: number;
    edit?: string;
    delete?: string;
    add: boolean;
    sortBy?: string;
    sortOrder?: string;
    filterField?: string;
    filterOperator?: string;
    filterValue?: string;
}) {
    const [rowCount, setRowCount] = useState<number>(0);
    const [rows, setRows] = useState<RestauranteInterface[]>([]);
    const [selectedRow, setSelectedRow] = useState<string | number | null>(
        null
    );
    const [tableLoading, setTableLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();
    const snackError = useSnackStore((state) => state.setOpenError);
    const actualPath = (params: Record<string, string>) => {
        let args: Record<string, string> = {};
        const numericParams = {
            page,
            size,
        };
        Object.keys(numericParams).forEach((param) => {
            const value = numericParams[param as keyof typeof numericParams];
            if (value) {
                args[param] = value.toString();
            }
        });
        const strParams = {
            sortBy,
            sortOrder,
            filterField,
            filterOperator,
            filterValue,
        };
        Object.keys(strParams).forEach((param) => {
            const value = strParams[param as keyof typeof strParams];
            if (value) {
                args[param] = value;
            }
        });
        const query = new URLSearchParams({ ...args, ...params });
        return `${pathname}?${query}`;
    };

    useEffect(() => {
        const fetchData = async () => {
            setTableLoading(true);
            return Promise.all([
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
    }, [
        filterField,
        filterOperator,
        filterValue,
        page,
        size,
        sortBy,
        sortOrder,
        add,
        del,
        edit,
    ]);

    function onPaginationModelChange(model: GridPaginationModel) {
        router.push(
            actualPath({
                page: model.page.toString(),
                size: model.pageSize.toString(),
            })
        );
    }
    function onRowSelectionModelChange(
        rowSelectionModel: GridRowSelectionModel
    ) {
        setSelectedRow(rowSelectionModel[0]);
    }
    function redirectLoadData(params: Record<string, string>) {
        router.push(actualPath(params));
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
                        Restaurantes
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Tooltip title="Agregar">
                        <IconButton
                            color="inherit"
                            onClick={() =>
                                router.push(actualPath({ add: "1" }))
                            }
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
                                            actualPath({
                                                edit: selectedRow.toString(),
                                            })
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
                                        router.push(
                                            actualPath({
                                                delete: selectedRow.toString(),
                                            })
                                        )
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
                paginationModel={{ page: page || 0, pageSize: size || 25 }}
                pageSizeOptions={[5, 10, 25, 50]}
                onSortModelChange={(args) => {
                    if (args.length > 0) {
                        redirectLoadData({
                            sortBy: args[0].field,
                            sortOrder: args[0].sort || "asc",
                        });
                    } else {
                        redirectLoadData({});
                    }
                }}
                onPaginationModelChange={onPaginationModelChange}
                onRowSelectionModelChange={onRowSelectionModelChange}
                onFilterModelChange={(args) => {
                    if (args.items.length > 0) {
                        redirectLoadData({
                            filterField: args.items[0].field,
                            filterOperator: args.items[0].operator,
                            filterValue: args.items[0].value,
                        });
                    } else {
                        redirectLoadData({});
                    }
                }}
            />
            <AddRestauranteDialog
                onClose={() => redirectLoadData({})}
                open={add}
            />

            <DeleteRestauranteDialog
                open={Boolean(del) && del !== ""}
                onClose={() => redirectLoadData({})}
                selected={del || ""}
            />

            <EditRestauranteDialog
                open={Boolean(edit) && edit !== ""}
                onClose={() => redirectLoadData({})}
                selected={edit || ""}
            />
        </>
    );
}
