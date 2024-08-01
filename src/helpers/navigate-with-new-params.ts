import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ReadonlyURLSearchParams } from "next/navigation";

/**
 * Función para agregar una nueva mesa
 * @param router - El enrutador de Next.js
 * @param searchParams - Los parámetros de búsqueda
 * @param pathname - La ruta actual
 */
export const navigateWithNewParam = (
    router: AppRouterInstance,
    searchParams: ReadonlyURLSearchParams,
    pathname: string,
    newParams: { name: string; value: string }[]
) => {
    // Crea un nuevo objeto URLSearchParams con los parámetros actuales
    const newSearchParams = new URLSearchParams(searchParams.toString());

    // Agrega el nuevo parámetro
    newParams.forEach((param) => {
        newSearchParams.set(param.name, param.value);
    });

    // Construye la nueva URL
    const newUrl = `${pathname}?${newSearchParams.toString()}`;

    // Navega a la nueva URL
    router.push(newUrl);
};
