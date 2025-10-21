import { FC, ReactNode, useState } from 'react';
import {
    Table as ShadTable,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/ui/table';
import { Checkbox } from '@/ui/checkbox';

interface Column<T> {
    header: string | ReactNode;
    accessor: keyof T | ((row: T) => ReactNode);
    className?: string;
}

interface TableProps<T> {
    columns: Column<T>[];
    data: T[];
    className?: string;
    rowClassName?: (row: T, index: number) => string;
    onSelectionChange?: (selectedRows: T[]) => void;
    selectable?: boolean;
}

export const Table = <T extends Record<string, any>>({
    columns,
    data,
    className,
    rowClassName,
    onSelectionChange,
    selectable = false,
}: TableProps<T>) => {
    const [selectedRows, setSelectedRows] = useState<T[]>([]);

    const allSelected = selectedRows.length === data.length;
    const someSelected = selectedRows.length > 0 && selectedRows.length < data.length;

    const toggleRow = (row: T) => {
        const alreadySelected = selectedRows.includes(row);
        const updated = alreadySelected
            ? selectedRows.filter(r => r !== row)
            : [...selectedRows, row];
        setSelectedRows(updated);
        onSelectionChange?.(updated);
    };

    const toggleAll = () => {
        if (allSelected) {
            setSelectedRows([]);
            onSelectionChange?.([]);
        } else {
            setSelectedRows(data);
            onSelectionChange?.(data);
        }
    };

    return (
        <ShadTable className={className}>
            <TableHeader>
                <TableRow>
                    {selectable && (
                        <TableHead>
                            <Checkbox
                                checked={allSelected}
                                className={someSelected ? 'bg-gray-400' : ''}
                                onCheckedChange={toggleAll}
                            />
                        </TableHead>
                    )}
                    {columns.map((col, idx) => (
                        <TableHead key={idx} className={col.className}>
                            {col.header}
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((row, rowIndex) => (
                    <TableRow key={rowIndex} className={rowClassName?.(row, rowIndex)}>
                        {selectable && (
                            <TableCell>
                                <Checkbox
                                    checked={selectedRows.includes(row)}
                                    onCheckedChange={() => toggleRow(row)}
                                />
                            </TableCell>
                        )}
                        {columns.map((col, colIndex) => (
                            <TableCell key={colIndex} className={col.className}>
                                {typeof col.accessor === 'function'
                                    ? col.accessor(row)
                                    : row[col.accessor]}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </ShadTable>
    );
};
