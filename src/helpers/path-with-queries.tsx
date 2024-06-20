/**
 * Converts object with search parameters in string, filtering undefined values and converting values
 * @param pathname - The pathname of the url
 * @param args - The search parameters as object
 * @returns The url with search parameters
 */
export default function pathWithQueries(
    pathname: string,
    args: Record<string, string | number | undefined>
) {
    let filteredArgs: Record<string, string> = {};
    Object.keys(args).forEach((param) => {
        const value = args[param as keyof typeof args];
        if (value) {
            filteredArgs[param] = value.toString();
        }
    });
    const query = new URLSearchParams(filteredArgs);
    return `${pathname}?${query}`;
}
