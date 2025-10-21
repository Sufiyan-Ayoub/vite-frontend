import {
    Table as LTable,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/ui/table";
import { useState, useEffect } from "react";
import { TableProps } from "./types";
import { Checkbox } from "@/ui/checkbox";
import { cn } from "@/cores";

const Table = <T,>({ selectable, onSelect, list, cols, striped }: TableProps<T>) => {
    const [selected, setSelected] = useState<Set<number>>(new Set());

    const toggle = (inx: number) => {
        const ns = new Set(selected);
        if (ns.has(inx)) ns.delete(inx);
        else ns.add(inx);
        setSelected(ns);
        onSelect?.([...ns].map(i => list[i]))
    }

    const toggleAll = () => {
        if (selected.size === list.length) {
            setSelected(new Set()), onSelect?.([]);
        } else {
            const allIndexes = new Set<number>(list.map((_, i) => i));
            setSelected(new Set(list.map((_, i) => i)));
            onSelect?.([...allIndexes].map(i => list[i]));
        }
    }

    return (
        <div className="overflow-hidden rounded-lg border border-gray-300">
            <LTable className="w-full">

                <TableHeader>
                    <TableRow className="bg-primary/10 hover:bg-primary/10">
                        {selectable && (
                            <TableHead className="w-12">
                                <Checkbox
                                    checked={selected.size === list.length && list.length > 0}
                                    onCheckedChange={toggleAll}
                                    aria-label="Select all"
                                />
                            </TableHead>
                        )}
                        {cols.map((col, i) => (
                            <TableHead key={i} className={cn(col.as)}>
                                {col.label}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {list.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={(selectable ? 1 : 0) + cols.length} className="text-center text-muted-foreground">
                                No data
                            </TableCell>
                        </TableRow>
                    ) : (
                        list.map((row, i) => (
                            <TableRow
                                key={i}
                                className={striped && i % 2 === 1 ? "bg-muted/30" : ""}
                            >
                                {selectable && (
                                    <TableCell>
                                        <Checkbox
                                            checked={selected.has(i)}
                                            onCheckedChange={() => toggle(i)}
                                            aria-label={`Select row ${i + 1}`}
                                        />
                                    </TableCell>
                                )}
                                {cols.map((col, j) => {
                                    const value = (row as any)[col.value];
                                    return (
                                        <TableCell key={j} className={cn(col.as)}>
                                            {col.render ? col.render(value, row) : value}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </LTable>
        </div>
    );
};

export default Table;