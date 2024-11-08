export interface LanguageType {
    id: number;
    code: string;
    name: string;
}

export interface LanguageWithRestaurantType extends LanguageType {
    restaurant_id: number;
    restaurant_link: string;
}

export interface RestaurantLanguageType {
    id: number;
    restaurant_id: number;
    restaurant_link: string;
    language_id: string;
    language_code: string;
    language_name: string;
}