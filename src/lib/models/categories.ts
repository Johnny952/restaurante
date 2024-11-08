export interface CategoryType {
    id: number;
    category_image: string;
    is_deleted: boolean;
    category_name: string;
    category_link: string;
    restaurant_id: number;
    restaurant_link: string;
    language_id: number;
    language_code: string;
    parent_category_id: number;
    parent_category_link: string;
}
