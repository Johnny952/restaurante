"use client";
import { notFound, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useLoadStore from "@/store/load-store";
import useSnackStore from "@/store/snackbar-store";
import EditLayout from "@/app/admin/components/layouts/edit";
import { getById } from "@/app/api/dishes/get";
import { DishTable } from "@/app/api/dishes/index.types";
import EditNameDialog from "./components/edit-name-dialog";
import EditImageDialog from "./components/edit-image-dialog";
import EditRestLangDialog from "./components/edit-rest-lang-cat-dialog";
import EditPriceDialog from "./components/edit-price-dialog";
import EditDescriptionDialog from "./components/edit-description-dialog";

const breadcrumbs = [
    {
        name: "Home",
        link: "/admin",
    },
    {
        name: "Platos",
        link: "/admin/platos",
    },
    {
        name: "Editar",
    },
];

export default function EditRestaurantePage({
    params: { id },
    searchParams: {
        editName,
        editLang,
        editRestaurant,
        editParent,
        editImage,
        editCat,
        editPrice,
        editDescription,
    },
}: {
    params: { id: string };
    searchParams: {
        editName?: string;
        editLang?: string;
        editRestaurant?: string;
        editParent?: string;
        editImage?: string;
        editCat?: string;
        editPrice?: string;
        editDescription: string;
    };
}) {
    const [oldData, setOldData] = useState<DishTable | null>(null);
    const router = useRouter();
    const pathname = usePathname();

    const setLoading = useLoadStore((state) => state.setLoading);
    const snackError = useSnackStore((state) => state.setOpenError);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            return getById(id);
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
    }, [
        id,
        editName,
        editLang,
        editRestaurant,
        editParent,
        editImage,
        editCat,
        editPrice,
        editDescription,
    ]);

    return (
        <EditLayout
            pathname={pathname}
            redirect={(link: string) => router.push(link)}
            breadcrumbs={breadcrumbs}
            goBack={() => router.push("/admin/platos")}
            title={`Editar plato: ${oldData?.name}`}
            data={[
                {
                    value: oldData?.name,
                    name: "Nombre",
                    link: "editName",
                },
                {
                    value: oldData?.restaurant,
                    name: "Restaurante",
                    link: "editRestaurant",
                },
                {
                    value: oldData?.language,
                    name: "Lenguaje",
                    link: "editLang",
                },
                {
                    value: oldData?.category,
                    name: "Categoría",
                    link: "editCat",
                },
                {
                    value: oldData?.price,
                    name: "Precio",
                    link: "editPrice",
                },
                {
                    value: oldData?.description,
                    name: "Descripción",
                    link: "editDescription",
                },
            ]}
            images={[
                {
                    src: oldData?.image,
                    link: "editImage",
                    name: "Imagen",
                },
            ]}
        >
            <EditNameDialog
                open={Boolean(editName)}
                id={id}
                onClose={() => router.push(pathname)}
            />
            <EditRestLangDialog
                open={
                    Boolean(editRestaurant) ||
                    Boolean(editLang) ||
                    Boolean(editCat)
                }
                id={id}
                onClose={() => router.push(pathname)}
            />
            <EditImageDialog
                open={Boolean(editImage)}
                id={id}
                onClose={() => router.push(pathname)}
            />
            <EditPriceDialog
                open={Boolean(editPrice)}
                id={id}
                onClose={() => router.push(pathname)}
            />
            <EditDescriptionDialog
                open={Boolean(editDescription)}
                id={id}
                onClose={() => router.push(pathname)}
            />
        </EditLayout>
    );
}
