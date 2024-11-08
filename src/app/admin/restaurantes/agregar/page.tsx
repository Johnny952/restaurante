import dynamic from "next/dynamic";
import Loader from "../../components/loader";

const AddRestaurantView = dynamic(() => import("./view"), {
    loading: () => <Loader />,
});

export default async function AddRestaurantPage() {
    return <AddRestaurantView />;
}
