"use client";
import { notFound, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useLoadStore from "@/store/load-store";
import useSnackStore from "@/store/snackbar-store";
import { CategoryTable } from "@/app/api/categories/index.types";
import { getCategoryById } from "@/app/api/categories/get-categories";
import EditLayout from "@/app/admin/components/layouts/edit";
import EditNameDialog from "./components/edit-name-dialog";
import EditRestLangDialog from "./components/edit-rest-lang-dialog";
import EditParentDialog from "./components/edit-parent-dialog";
import EditImageDialog from "./components/edit-image-dialog";

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

export default function EditRestaurantePage({
    params: { id },
    searchParams: { editName, editLang, editRestaurant, editParent, editImage },
}: {
    params: { id: string };
    searchParams: {
        editName?: string;
        editLang?: string;
        editRestaurant?: string;
        editParent?: string;
        editImage?: string;
    };
}) {
    const [oldData, setOldData] = useState<CategoryTable | null>(null);
    const router = useRouter();
    const pathname = usePathname();

    const setLoading = useLoadStore((state) => state.setLoading);
    const snackError = useSnackStore((state) => state.setOpenError);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            return getCategoryById(id);
        };

        fetchData()
            .then((data) => {
                if (!data) {
                    notFound();
                }
                setOldData(data);
                setLoading(false);
            })
            .catch((error) => {
                snackError(`Ocurrió un error: ${error.toString()}`);
                setLoading(false);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, editName, editLang, editRestaurant, editParent, editImage]);

    return (
        <EditLayout
            pathname={pathname}
            redirect={(link: string) => router.push(link)}
            breadcrumbs={breadcrumbs}
            goBack={() => router.push("/admin/categorias")}
            title={`Editar categoría: ${oldData?.name}`}
            data={[
                {
                    value: oldData?.name,
                    name: "Nombre",
                    link: "editName",
                },
                {
                    value: oldData?.restaurant_name,
                    name: "Restaurante",
                    link: "editRestaurant",
                },
                {
                    value: oldData?.language,
                    name: "Lenguaje",
                    link: "editLang",
                },
                {
                    value: oldData?.parent,
                    name: "Categoría padre",
                    link: "editParent",
                },
            ]}
            image={{
                src: oldData?.image,
                link: "editImage",
            }}
        >
            <EditNameDialog
                open={Boolean(editName)}
                id={id}
                onClose={() => router.push(pathname)}
            />
            <EditRestLangDialog
                open={Boolean(editRestaurant) || Boolean(editLang)}
                id={id}
                onClose={() => router.push(pathname)}
            />
            <EditParentDialog
                open={Boolean(editParent)}
                id={id}
                onClose={() => router.push(pathname)}
            />
            <EditImageDialog
                open={Boolean(editImage)}
                id={id}
                onClose={() => router.push(pathname)}
            />
        </EditLayout>
    );
}
