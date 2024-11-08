import { getById } from "@/lib/services/restaurant";
import EditRestaurantView from "./view";

export default async function EditRestaurantPage({
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
    const restaurant = await getById(id);
    if ('error' in restaurant) {
        return 'Not Found'
    }

    return (
        <EditRestaurantView
            restaurant={restaurant}
            editName={editName}
            editLogo={editLogo}
            editBackground={editBackground}
        />
    );
}
