import { Order } from "../types/order.d";

export const orders: Order[] = [
    {
        id: "0",
        timestamp: new Date(),
        table: 1,
        status: "new",
        items: [
            {
                name: "Fideos con salsa",
                quantity: 1,
                notes: "Estos son los detalles",
            },
            {
                name: "Coca cola",
                quantity: 1,
                notes: "",
            },
            {
                name: "Brownie",
                quantity: 1,
                notes: "",
            },
        ],
    },
    {
        id: "0.5",
        timestamp: new Date(),
        table: 1,
        status: "new",
        items: [
            {
                name: "Fideos con salsa",
                quantity: 1,
            },
            {
                name: "Coca cola",
                quantity: 1,
            },
            {
                name: "Brownie",
                quantity: 1,
            },
        ],
    },
    {
        id: "1",
        timestamp: new Date(),
        table: 2,
        status: "preparing",
        items: [
            {
                name: "Fideos con salsa",
                quantity: 1,
                notes: "Estos son los detalles",
            },
            {
                name: "Sopa",
                quantity: 2,
                notes: "Estos son los detalles",
            },
            {
                name: "Coca cola",
                quantity: 1,
                notes: "",
            },
            {
                name: "Brownie",
                quantity: 1,
                notes: "",
            },
        ],
    },
    {
        id: "2",
        timestamp: new Date(),
        table: 2,
        status: "preparing",
        items: [
            {
                name: "Fideos con salsa",
                quantity: 1,
                notes: "Estos son los detalles",
            },
            {
                name: "Sopa",
                quantity: 2,
                notes: "Estos son los detalles",
            },
            {
                name: "Coca cola",
                quantity: 1,
                notes: "",
            },
            {
                name: "Brownie",
                quantity: 1,
                notes: "",
            },
        ],
    },
    {
        id: "3",
        timestamp: new Date(),
        table: 2,
        status: "preparing",
        items: [
            {
                name: "Fideos con salsa",
                quantity: 1,
                notes: "Estos son los detalles",
            },
            {
                name: "Sopa",
                quantity: 2,
                notes: "Estos son los detalles",
            },
            {
                name: "Coca cola",
                quantity: 1,
                notes: "",
            },
            {
                name: "Brownie",
                quantity: 1,
                notes: "",
            },
        ],
    },
    {
        id: "4",
        timestamp: new Date(),
        table: 2,
        status: "ready",
        items: [
            {
                name: "Fideos con salsa",
                quantity: 1,
                notes: "Estos son los detalles",
            },
            {
                name: "Sopa",
                quantity: 2,
                notes: "Estos son los detalles",
            },
            {
                name: "Coca cola",
                quantity: 1,
                notes: "",
            },
            {
                name: "Brownie",
                quantity: 1,
                notes: "",
            },
        ],
    },
    {
        id: "5",
        timestamp: new Date(),
        table: 2,
        status: "ready",
        items: [
            {
                name: "Fideos con salsa",
                quantity: 1,
                notes: "Estos son los detalles",
            },
            {
                name: "Sopa",
                quantity: 2,
                notes: "Estos son los detalles",
            },
            {
                name: "Coca cola",
                quantity: 1,
                notes: "",
            },
            {
                name: "Brownie",
                quantity: 1,
                notes: "",
            },
        ],
    },
];
