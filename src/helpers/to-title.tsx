export default function toTitle(str: string) {
    const words = str.split(' ').map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase());
    return words.join(' ');
}