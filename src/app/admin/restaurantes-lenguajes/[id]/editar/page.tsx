"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useLoadStore from "@/store/load-store";
import useSnackStore from "@/store/snackbar-store";
// import { RestaurantLanguageInterface } from "@/app/api/restaurants-languages/index.types";
// import { get } from "@/app/api/restaurants-languages/get";
import EditRestaurantDialog from "./components/edit-restaurant-dialog";
import EditLanguageDialog from "./components/edit-language-dialog";
import EditLayout from "@/app/admin/components/layouts/edit";
import { RestaurantLanguageType } from "@/lib/models/language";

const breadcrumbs = [
    {
        name: "Home",
        link: "/admin",
    },
    {
        name: "Restaurantes",
        link: "/admin/restaurantes-lenguajes",
    },
    {
        name: "Editar",
    },
];

export default function EditRestaurantePage({
    params: { id },
    searchParams: { editRestaurant, editLanguage },
}: {
    params: { id: string };
    searchParams: {
        editRestaurant?: string;
        editLanguage?: string;
    };
}) {
    const [oldData, setOldData] =
        useState<RestaurantLanguageType | null>();
    const router = useRouter();
    const pathname = usePathname();

    const setLoading = useLoadStore((state) => state.setLoading);
    const snackError = useSnackStore((state) => state.setOpenError);

    const goBack = () => {
        router.push("/admin/restaurantes-lenguajes");
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            // return get(id);
            return null
        };

        fetchData()
            .then((data) => {
                setOldData(data);
                setLoading(false);
            })
            .catch((error) => {
                snackError(`Ocurrió un error: ${error.toString()}`);
                setLoading(false);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, editRestaurant, editLanguage]);

    return (
        <EditLayout
            pathname={pathname}
            breadcrumbs={breadcrumbs}
            title={`Editar lenguage de restaurante`}
            data={[
                {
                    value: oldData?.restaurant_id.toString(),
                    name: "Restaurante",
                    link: "editRestaurant",
                },
                {
                    value: oldData?.language_name,
                    name: "Lenguaje",
                    link: "editLanguage",
                },
            ]}
        >
            <EditLanguageDialog
                id={id}
                open={Boolean(editLanguage)}
                onClose={() => router.push(pathname)}
            />
            <EditRestaurantDialog
                id={id}
                open={Boolean(editRestaurant)}
                onClose={() => router.push(pathname)}
            />
        </EditLayout>
    );
}
