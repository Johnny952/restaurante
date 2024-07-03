export default function toKebabCase(str: string) {
    return str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // Elimina diacríticos
        .replace(/[^a-z0-9\s-]/g, "") // Elimina caracteres especiales
        .replace(/\s+/g, "-") // Reemplaza espacios por guiones
        .replace(/ñ/g, "n") // Reemplaza ñ por n
        .replace(/-+/g, "-") // Elimina guiones múltiples
        .replace(/^-+/, "") // Elimina guiones al inicio
        .replace(/-+$/, ""); // Elimina guiones al final
}
