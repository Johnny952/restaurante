import { SubcategoryPageParams } from "../page.d";

export interface DishPageParams extends SubcategoryPageParams {
    dish: string;
}

export interface DishPageProps {
    params: DishPageParams;
}
