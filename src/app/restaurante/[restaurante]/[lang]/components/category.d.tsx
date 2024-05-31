export interface CategoryInterface {
    name: string;
    image?: string;
    subcategories: SubCategoryInterface[];
}

export interface SubCategoryInterface {
    name: string;
    link: string;
    image?: string;
}