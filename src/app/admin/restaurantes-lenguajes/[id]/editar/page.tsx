"use client";
import LinkBreadcrumbs from "@/components/link-breadcrumbs";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useLoadStore from "@/store/load-store";
import useSnackStore from "@/store/snackbar-store";
import { RestaurantLanguageInterface } from "@/app/api/restaurants-languages/index.types";
import { get } from "@/app/api/restaurants-languages/get";
import EditRestaurantDialog from "./components/edit-restaurant-dialog";
import EditLanguageDialog from "./components/edit-language-dialog";
import EditLayout from "@/app/admin/components/layouts/edit";

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
        useState<RestaurantLanguageInterface | null>();
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
            return get(id);
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
            redirect={(link: string) => router.push(link)}
            breadcrumbs={breadcrumbs}
            goBack={() => router.push("/admin/restaurantes-lenguajes")}
            title={`Editar lenguage de restaurante`}
            data={[
                {
                    value: oldData?.restaurant_name,
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
