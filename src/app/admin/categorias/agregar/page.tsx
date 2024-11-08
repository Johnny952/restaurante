import { getAll } from "@/lib/services/restaurant";
import Loader from "../../components/loader";
import dynamic from "next/dynamic";

const AddCategoryView = dynamic(() => import('./view'), {
    loading: () => <Loader />
})

export default async function AddCategoryPage() {
    const restaurants = await getAll();

    if ("error" in restaurants) {
        return <AddCategoryView restaurants={[]} />;
    }

    return <AddCategoryView restaurants={restaurants} />;
}
