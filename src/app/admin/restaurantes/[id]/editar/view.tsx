"use client"

import EditLayout from "@/app/admin/components/layouts/edit";
import { RestaurantType } from "@/lib/models/restaurant";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import useSWR, { SWRConfig } from "swr";
import EditRestaurantNameDialog from "./components/edit-name-dialog";
import EditRestaurantLogoDialog from "./components/edit-logo-dialog";
import EditRestaurantBGDialog from "./components/edit-bg-dialog";
import Loader from "@/app/admin/components/loader";


const fetcher = (url: string) => fetch(url).then((res) => res.json());

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

interface Props {
    restaurant: RestaurantType;
    editName?: string;
    editLogo?: string;
    editBackground?: string;
}

export default function EditRestaurantView({ restaurant, editName, editLogo, editBackground }: Props) {
    const router = useRouter()
    const pathname = usePathname()

    const { data, error, mutate } = useSWR<RestaurantType | { error: string }>(
        `/api/restaurants/${restaurant.id}`,
        fetcher,
        { fallbackData: restaurant },
    );

    if (error || !data || "error" in data) return <div>Error al cargar los datos</div>;
    if (!data) return <Loader />;

    return (
        <SWRConfig value={{
            fallback: {
                [`/api/restaurants/${restaurant.id}`]: restaurant
            }
        }}>
            <EditLayout
                pathname={pathname}
                breadcrumbs={breadcrumbs}
                title={`Editar restaurante: ${data?.name}`}
                data={[
                    {
                        value: data?.name,
                        name: "Nombre",
                        link: "editName",
                    },
                ]}
                images={[
                    {
                        src: data?.logo || "",
                        link: "editLogo",
                        name: "Logo",
                    },
                    {
                        src: data?.background_image || "",
                        link: "editBackground",
                        name: "Fondo",
                    },
                ]}
            >
                <EditRestaurantNameDialog
                    id={data?.id}
                    open={Boolean(editName)}
                    onClose={() => {
                        router.push(pathname)
                        mutate()
                    }}
                />
                <EditRestaurantLogoDialog
                    open={Boolean(editLogo)}
                    id={data?.id}
                    onClose={() => {
                        router.push(pathname)
                        mutate()
                    }}
                    oldLogo={restaurant?.logo || ""}
                    restaurant={restaurant?.link || ""}
                />
                <EditRestaurantBGDialog
                    open={Boolean(editBackground)}
                    id={data?.id}
                    onClose={() => {
                        router.push(pathname)
                        mutate()
                    }}
                    oldBG={restaurant?.background_image || ""}
                    restaurant={restaurant?.link || ""}
                />
            </EditLayout>
        </SWRConfig >
    );
}