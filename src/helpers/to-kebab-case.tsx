export default function toKebabCase(str: string) {
    return str.toLocaleLowerCase().replaceAll(' ', '-').normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}