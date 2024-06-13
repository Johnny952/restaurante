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
    Modal,
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
import AddRestaurante from "./add-restaurante";
import { deleteRestaurante } from "@/app/api/restaurantes/delete-restaurante";
import useLoadStore from "@/store/load-store";
import useSnackStore from "@/store/snackbar-store";

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
        field: "restaurante",
        headerName: "Restaurante",
        width: 150,
        filterOperators,
    },
    { field: "id", headerName: "Link", width: 150, filterOperators },
    {
        field: "image",
        headerName: "Imagen",
        width: 300,
        filterable: false,
    },
];

const modalStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
};

export default function Table({
    rows,
    rowCount,
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
    rows: object[];
    rowCount: number;
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
    const [selectedRow, setSelectedRow] = useState<string | number | null>(
        null
    );
    const [tableLoading, setTableLoading] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const setLoading = useLoadStore((state) => state.setLoading);
    const snackSuccess = useSnackStore((state) => state.setOpenSuccess);
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
        setTableLoading(false);
    }, [rows]);

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
        console.log(rowSelectionModel);
        setSelectedRow(rowSelectionModel[0]);
    }
    function goHere() {
        router.push(actualPath({}));
    }
    function redirectLoadData(params: Record<string, string>) {
        setTableLoading(true);
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
                                <IconButton color="inherit">
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
            <Modal open={add} onClose={() => redirectLoadData({})}>
                <Box sx={modalStyle}>
                    <AddRestaurante goHere={goHere} />
                </Box>
            </Modal>

            <Dialog
                open={Boolean(del)}
                onClose={() => redirectLoadData({})}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"¿Esta seguro de eliminar este restaurante?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Esta acción no puede ser revertida.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => redirectLoadData({})} color="error">
                        Cancelar
                    </Button>
                    <Button
                        onClick={async () => {
                            setLoading(true);
                            try {
                                await deleteRestaurante(selectedRow);
                                snackSuccess(
                                    `Restaurante ${selectedRow} eliminado`
                                );
                            } catch (error) {
                                snackError(`Ocurrió un error: ${error}`);
                            }
                            setLoading(false);
                            redirectLoadData({});
                        }}
                        autoFocus
                    >
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
