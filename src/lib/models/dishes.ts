export interface DishType {
    id: number;
    dish_price: number;
    dish_image: string | null;
    is_deleted: boolean;
    dish_name: string;
    dish_link: string;
    dish_description: string | null;
    category_id: number;
    category_name: string;
    category_link: string;
    restaurant_id: number;
    restaurant_link: string;
    language_id: number;
    language_code: string;
}