import { CategoryPageParams } from "../page.d";

export interface DishPageParams extends CategoryPageParams {
    dish: string;
}

export interface DishPageProps {
    params: DishPageParams;
}
