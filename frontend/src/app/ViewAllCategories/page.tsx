import { getCategoriesServer } from "../../lib/serverMuseumApi";
import ViewAllCategoriesClient from "./ViewAllCategoriesClient";

export default async function ViewAllCategoriesPage() {
    let initialCategories = null;
    try {
        initialCategories = await getCategoriesServer();
    } catch {
        initialCategories = null;
    }

    return <ViewAllCategoriesClient initialCategories={initialCategories} />;
}
