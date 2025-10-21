export type Column<T> = {
    as?: string | string[];
    label: string;
    value: keyof T | string;
    render?: (value: any, row: T) => React.ReactNode;
}

export type TableProps<T> = {
    cols: Column<T>[];
    list: T[];
    striped?: boolean;
    selectable: boolean;
    onSelect: (rows: T[]) => void;
}