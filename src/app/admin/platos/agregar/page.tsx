import dynamic from 'next/dynamic';
import Loader from '../../components/loader';
import { getAll } from "@/lib/services/restaurant";

const AddDishView = dynamic(() => import('./view'), {
    loading: () => <Loader />
})

export default async function AddRestaurantPage() {
    const restaurants = await getAll();

    if ("error" in restaurants) {
        return <AddDishView restaurants={[]} />;
    }

    return (
        <AddDishView restaurants={restaurants} />
    );
}
