export interface Order {
    id: string;
    timestamp: Date;
    table: number;
    status: "new" | "preparing" | "ready";
    items: Array<{
        name: string;
        quantity: number;
        notes?: string;
    }>;
}
