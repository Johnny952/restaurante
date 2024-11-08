import { getById } from "@/lib/services/category";
import EditCategoryView from "./view";
import EditNameDialog from "./components/edit-name-dialog";
import EditRestLangDialog from "./components/edit-rest-lang-dialog";
import EditParentDialog from "./components/edit-parent-dialog";
import EditImageDialog from "./components/edit-image-dialog";

export default async function EditCategoryPage({
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
    const category = await getById(id);
    if ("error" in category) {
        return null;
    }

    return (
        <>
            <EditCategoryView category={category} />

            <EditNameDialog open={Boolean(editName)} id={id} />
            <EditRestLangDialog
                open={Boolean(editRestaurant) || Boolean(editLang)}
                id={id}
            />
            <EditParentDialog
                open={Boolean(editParent)}
                id={id}
                category={category}
            />
            <EditImageDialog
                open={Boolean(editImage)}
                id={id}
                category={category}
            />
        </>
    );
}
