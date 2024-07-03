export interface DishInterface {
    id: string;
    name: string;
    image: string;
    link: string;
    description: string;
    price: number;
}

export interface DishTable {
    id: string;
    category: string;
    restaurant: string;
    restaurant_id: string;
    language: string;
    name: string;
    price: string;
    description: string;
    link: string;
    image: string;
}
