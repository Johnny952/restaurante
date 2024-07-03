"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useLoadStore from "@/store/load-store";
import useSnackStore from "@/store/snackbar-store";
import EditNameDialog from "./components/edit-name-dialog";
import { LanguageTableInterface } from "@/app/api/languages/index.types";
import { getById } from "@/app/api/languages/get";
import EditIDDialog from "./components/edit-id-dialog";
import EditLayout from "@/app/admin/components/layouts/edit";

const breadcrumbs = [
    {
        name: "Home",
        link: "/admin",
    },
    {
        name: "Lenguajes",
        link: "/admin/lenguajes",
    },
    {
        name: "Editar",
    },
];

export default function EditLanguagePage({
    params: { id },
    searchParams: { editName, editID },
}: {
    params: { id: string };
    searchParams: {
        editName?: string;
        editID?: string;
    };
}) {
    const [oldData, setOldData] = useState<LanguageTableInterface | null>(null);
    const router = useRouter();
    const pathname = usePathname();

    const setLoading = useLoadStore((state) => state.setLoading);
    const snackError = useSnackStore((state) => state.setOpenError);
    3;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            return getById(id);
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
    }, [id, editName, editID]);

    return (
        <EditLayout
            pathname={pathname}
            redirect={(link: string) => router.push(link)}
            breadcrumbs={breadcrumbs}
            goBack={() => router.push("/admin/lenguajes")}
            title={`Editar Lenguaje: ${oldData?.name}`}
            data={[
                {
                    value: oldData?.id,
                    name: "ID",
                    link: "editID",
                },
                {
                    value: oldData?.name,
                    name: "Nombre",
                    link: "editName",
                },
            ]}
        >
            <EditIDDialog
                id={id}
                open={Boolean(editID)}
                onClose={(newID: string) =>
                    router.push(`/admin/lenguajes/${newID}/editar`)
                }
            />
            <EditNameDialog
                id={id}
                open={Boolean(editName)}
                onClose={() => router.push(pathname)}
            />
        </EditLayout>
    );
}
