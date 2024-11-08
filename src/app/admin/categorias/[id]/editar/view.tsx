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
    category: CategoryType & {
        restaurant_name: string;
        restaurant_link: string;
        parent: string;
        language: string;
    };
}

export default function EditCategoryView({ category }: Props) {
    return (
        <EditLayout
            pathname={"editar"}
            breadcrumbs={breadcrumbs}
            title={`Editar categoría: ${category.name}`}
            data={[
                {
                    value: category.name,
                    name: "Nombre",
                    link: "editName",
                },
                {
                    value: category.restaurant_name,
                    name: "Restaurante",
                    link: "editRestaurant",
                },
                {
                    value: category.language,
                    name: "Lenguaje",
                    link: "editLang",
                },
                {
                    value: category.parent,
                    name: "Categoría padre",
                    link: "editParent",
                },
            ]}
            images={[
                {
                    src: category.image,
                    link: "editImage",
                    name: "Imagen",
                },
            ]}
        />
    );
}
