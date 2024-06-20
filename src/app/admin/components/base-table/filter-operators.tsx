import { GridFilterInputValue, GridFilterOperator } from "@mui/x-data-grid";

export default [
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
] as GridFilterOperator[];
