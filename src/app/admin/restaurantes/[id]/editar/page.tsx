"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { RestaurantInterface } from "@/app/api/restaurants/index.types";
import useLoadStore from "@/store/load-store";
import useSnackStore from "@/store/snackbar-store";
import { getByID } from "@/app/api/restaurants/get";
import EditRestaurantNameDialog from "./components/edit-name-dialog";
import EditRestaurantLogoDialog from "./components/edit-logo-dialog";
import EditLayout from "@/app/admin/components/layouts/edit";
import EditRestaurantBGDialog from "./components/edit-bg-dialog";

const breadcrumbs = [
    {
        name: "Home",
        link: "/admin",
    },
    {
        name: "Restaurantes",
        link: "/admin/restaurantes",
    },
    {
        name: "Editar",
    },
];

export default function EditRestaurantPage({
    params: { id },
    searchParams: { editName, editLogo, editBackground },
}: {
    params: { id: string };
    searchParams: {
        editName?: string;
        editLogo?: string;
        editBackground?: string;
    };
}) {
    const [oldData, setOldData] = useState<RestaurantInterface | null>(null);
    const router = useRouter();
    const pathname = usePathname();

    const setLoading = useLoadStore((state) => state.setLoading);
    const snackError = useSnackStore((state) => state.setOpenError);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            return getByID(id);
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
    }, [id, editName, editLogo, editBackground]);

    return (
        <EditLayout
            pathname={pathname}
            redirect={(link: string) => router.push(link)}
            breadcrumbs={breadcrumbs}
            goBack={() => router.push("/admin/restaurantes")}
            title={`Editar restaurante: ${oldData?.name}`}
            data={[
                {
                    value: oldData?.name,
                    name: "Nombre",
                    link: "editName",
                },
            ]}
            images={[
                {
                    src: oldData?.image,
                    link: "editLogo",
                    name: "Logo",
                },
                {
                    src: oldData?.background,
                    link: "editBackground",
                    name: "Fondo",
                },
            ]}
        >
            <EditRestaurantNameDialog
                id={id}
                open={Boolean(editName)}
                onClose={() => router.push(pathname)}
            />
            <EditRestaurantLogoDialog
                open={Boolean(editLogo)}
                id={id}
                onClose={() => router.push(pathname)}
                oldLogo={oldData?.image || ""}
                restaurant={oldData?.link || ""}
            />
            <EditRestaurantBGDialog
                open={Boolean(editBackground)}
                id={id}
                onClose={() => router.push(pathname)}
                oldBG={oldData?.background || ""}
                restaurant={oldData?.link || ""}
            />
        </EditLayout>
    );
}
