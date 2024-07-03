import { LanguagePageParams } from "../page.d";

export interface CategoryPageParams extends LanguagePageParams {
    category: string;
}

export interface CategoryPageProps {
    params: CategoryPageParams;
}
