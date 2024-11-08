"use client";
import EditLayout from "@/app/admin/components/layouts/edit";
import { CategoryType } from "@/lib/models/categories";

const breadcrumbs = [
    {
        name: "Home",
        link: "/admin",
    },
    {
        name: "Categorías",
        link: "/admin/categorias",
    },
    {
        name: "Editar",
    },
];

interface Props {
    category: CategoryType;
}

export default function EditCategoryView({ category }: Props) {
    return (
        <EditLayout
            pathname={"editar"}
            breadcrumbs={breadcrumbs}
            title={`Editar categoría: ${category.category_name}`}
            data={[
                {
                    value: category.category_name,
                    name: "Nombre",
                    link: "editName",
                },
                {
                    value: category.restaurant_link,
                    name: "Restaurante",
                    link: "editRestaurant",
                },
                {
                    value: category.language_code,
                    name: "Lenguaje",
                    link: "editLang",
                },
                {
                    value: category.parent_category_link,
                    name: "Categoría padre",
                    link: "editParent",
                },
            ]}
            images={[
                {
                    src: category.category_image,
                    link: "editImage",
                    name: "Imagen",
                },
            ]}
        />
    );
}
