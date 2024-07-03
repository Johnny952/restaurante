import { RestaurantPageParams } from "../page.d";

export interface LanguagePageParams extends RestaurantPageParams {
    lang: string;
}

export interface LanguagePageProps {
    params: LanguagePageParams;
}
