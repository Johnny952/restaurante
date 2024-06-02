import { RestaurantePageParams } from "../page.d";

export interface LanguagePageParams extends RestaurantePageParams {
    lang: string
}

export interface LanguagePageProps {
    params: LanguagePageParams
}