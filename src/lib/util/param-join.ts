interface ParamJoinResult {
    queryString: string;
    values: any[];
}

export default function paramJoin(fields: Record<string, any>): ParamJoinResult {
    const keys = Object.keys(fields);
    const values: any[] = [];
    const queryParts = keys.map((key, index) => {
        if (fields[key] === undefined) {
            return `${key} IS NULL`;
        }
        values.push(fields[key]);
        return `${key} = $${index + 1}`;
    });

    return {
        queryString: queryParts.join(" AND "),
        values: values
    };
}
