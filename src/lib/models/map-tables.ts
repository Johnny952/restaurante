export interface MapTableType {
    id: number;
    number?: number;
    map_id: number;
    table_id: number;
    deleted?: boolean;
    position_x: number;
    position_y: number;
    qr_code_id: string;
    qr_code?: string;
}
