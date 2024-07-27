import { BaseTableProps } from "./table";
import StandardTable from "./table";

interface TableProps extends BaseTableProps {
    typeId: string;
}

export default function Table(props: TableProps) {
    const map: Record<string, JSX.Element> = {
        "1": <StandardTable {...props} people={2} />,
        "2": <StandardTable {...props} people={4} />,
        "3": <StandardTable {...props} people={6} />,
    };

    return map[props.typeId];
}
