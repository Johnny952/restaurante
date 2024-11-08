import dynamic from "next/dynamic";
import Loader from "../../components/loader";
import { getAll as getAllRestaurants } from "@/lib/repositories/restaurant";
import { getAll as getAllLanguages } from "@/lib/repositories/language";

const AddRestLanguageView = dynamic(() => import("./view"), {
    loading: () => <Loader />,
});

export default async function AddRestLanguagePage() {
    const data = await Promise.all([getAllRestaurants(), getAllLanguages()]);

    return <AddRestLanguageView restaurants={data[0]} languages={data[1]} />;
}
