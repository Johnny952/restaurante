import { CategoryPageParams } from "../page.d";

export interface SubcategoryPageParams extends CategoryPageParams {
    subcategory: string;
}

export interface SubcategoryPageProps {
    params: SubcategoryPageParams
}