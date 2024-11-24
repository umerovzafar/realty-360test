"use client";

import type { Table } from "@tanstack/react-table";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
      <p className="text-sm text-muted-foreground">
        Выбрано {table.getFilteredSelectedRowModel().rows.length} из{" "}
        {table.getFilteredRowModel().rows.length} строк.
      </p>
      <div className="flex flex-col items-center gap-4 md:flex-row">
        <div className="flex items-center gap-x-2">
          <small className="text-sm font-medium leading-none">
            Строков на странице
          </small>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => table.setPageSize(Number(value))}
          >
            <SelectTrigger>
              <SelectValue
                placeholder={`${table.getState().pagination.pageSize}`}
              />
            </SelectTrigger>
            <SelectContent>
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <small className="text-sm font-medium leading-none">
          Страница {table.getState().pagination.pageIndex + 1} из{" "}
          {table.getPageCount()}
        </small>
        <div className="flex items-center gap-x-2">
          <Button
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.setPageIndex(0)}
            variant="outline"
            size="icon"
          >
            <DoubleArrowLeftIcon />
            <span className="sr-only">Перейти на первую страницу</span>
          </Button>
          <Button
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
            variant="outline"
            size="icon"
          >
            <ChevronLeftIcon />
            <span className="sr-only">Перейти на предыдущую страницу</span>
          </Button>
          <Button
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
            variant="outline"
            size="icon"
          >
            <ChevronRightIcon />
            <span className="sr-only">Перейти на следующую страницу</span>
          </Button>
          <Button
            disabled={!table.getCanNextPage()}
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            variant="outline"
            size="icon"
          >
            <DoubleArrowRightIcon />
            <span className="sr-only">Перейти на последнюю страницу</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
