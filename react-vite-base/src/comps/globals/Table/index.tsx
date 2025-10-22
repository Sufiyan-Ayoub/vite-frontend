"use client";

import {
    Table as LTable,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/ui/table";
import { useId, useState } from "react";
import { TableProps } from "./types";
import { Checkbox } from "@/ui/checkbox";
import { cn } from "@/cores";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/ui/pagination";

const Table = <T,>({
    selectable,
    onSelect,
    list,
    cols,
    striped,
    pageSize = 2,
    stickyHeader = false
}: TableProps<T> & { stickyHeader?: boolean }) => {
    const id = useId()
    const [selected, setSelected] = useState<Set<number>>(new Set());
    const [page, setPage] = useState(1);
    const totalPages = Math.ceil(list.length / pageSize);
    const currentData = list.slice((page - 1) * pageSize, page * pageSize);

    const toggle = (inx: number) => {
        const ns = new Set(selected);
        if (ns.has(inx)) ns.delete(inx);
        else ns.add(inx);
        setSelected(ns);
        onSelect?.([...ns].map((i) => list[i]));
    };

    const handlePageChange = (newPage: number) => {
        if (newPage < 1 || newPage > totalPages) return;
        setPage(newPage);
    };

    const toggleAll = () => {
        if (selected.size === list.length) {
            setSelected(new Set());
            onSelect?.([]);
        } else {
            const allIndexes = new Set<number>(list.map((_, i) => i));
            setSelected(allIndexes);
            onSelect?.([...allIndexes].map((i) => list[i]));
        }
    };

    const getPaginationRange = () => {
        const totalPageNumbers = 5; // max buttons to show
        const total = totalPages;

        if (total <= totalPageNumbers) {
            return Array.from({ length: total }, (_, i) => i + 1);
        }

        const leftSiblingIndex = Math.max(page - 1, 2);
        const rightSiblingIndex = Math.min(page + 1, total - 1);

        const showLeftEllipsis = leftSiblingIndex > 2;
        const showRightEllipsis = rightSiblingIndex < total - 1;

        const pages: (number | string)[] = [1];

        if (showLeftEllipsis) pages.push("...");
        for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
            pages.push(i);
        }
        if (showRightEllipsis) pages.push("...");
        pages.push(total);

        return pages;
    };


    return (
        <div className="w-full rounded-2xl border bg-background shadow-sm overflow-hidden">
            <div className="relative">
                <LTable className="w-full">
                    <TableHeader
                        className={cn(
                            "bg-sidebar font-semibold",
                            stickyHeader &&
                            "sticky top-0 z-10 shadow-sm border-b bg-sidebar"
                        )}
                    >
                        <TableRow className="bg-sidebar hover:bg-sidebar">
                            {selectable && (
                                <TableHead className="w-12 bg-sidebar font-semibold hover:bg-sidebar">
                                    <Checkbox
                                        checked={selected.size === list.length && list.length > 0}
                                        onCheckedChange={toggleAll}
                                        aria-label="Select all"
                                    />
                                </TableHead>
                            )}
                            {cols.map((col, i) => (
                                <TableHead
                                    key={i}
                                    className={cn(
                                        "bg-sidebar font-semibold hover:bg-sidebar",
                                        col.as
                                    )}
                                >
                                    {col.label}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {currentData.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={(selectable ? 1 : 0) + cols.length}
                                    className="text-center text-muted-foreground py-6"
                                >
                                    No data
                                </TableCell>
                            </TableRow>
                        ) : (
                            currentData.map((row, i) => (
                                <TableRow
                                    key={i}
                                    className={cn(
                                        striped && i % 2 === 1 ? "bg-muted/30" : "",
                                        "transition-colors"
                                    )}
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

            {/* {totalPages > 1 && ( */}
            <div className="p-4 flex justify-center border-t bg-muted/10">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={() => handlePageChange(page - 1)}
                                isActive={!(page === 1)}
                            />
                        </PaginationItem>

                        {getPaginationRange().map((p, inx) =>
                            <PaginationItem key={`pg-item-${inx}-${id}`}>
                                {typeof p === "number" ? (
                                    <PaginationLink
                                        onClick={() => handlePageChange(p)}
                                        isActive={p === page}
                                    >
                                        {p}
                                    </PaginationLink>
                                ) : (
                                    <span className="px-3 py-1">...</span>
                                )}
                            </PaginationItem>
                        )}

                        <PaginationItem>
                            <PaginationNext
                                onClick={() => handlePageChange(page + 1)}
                                isActive={page !== totalPages}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
            {/* )} */}
        </div>
    );
};

export default Table;
