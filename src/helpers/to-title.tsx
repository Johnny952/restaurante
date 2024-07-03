export default function toTitle(str: string | undefined) {
    if (!str) {
        return "";
    }
    const words = str
        .split(" ")
        .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase());
    return words.join(" ");
}
