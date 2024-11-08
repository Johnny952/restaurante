export interface BaseRestaurantType {
    id: number;
    name: string;
    link: string;
}

export interface RestaurantType extends BaseRestaurantType {
    logo: string | null;
    background_image: string | null;
    is_deleted: boolean;
}