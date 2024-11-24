"use client";

import type { Column } from "@tanstack/react-table";

import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
} from "@radix-ui/react-icons";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DataTableColumnHeaderProps<TData, TValue> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const columnFilterValue = column.getFilterValue();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="data-[state=open]:bg-accent data-[state=open]:text-accent-foreground"
        >
          {column.getIsSorted() === "desc" && <ArrowDownIcon />}
          {column.getIsSorted() === "asc" && <ArrowUpIcon />}
          {column.getIsSorted() === undefined && <CaretSortIcon />}
          {title}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowUpIcon className="pointer-events-none mr-2 size-4 shrink-0" />
            По возрастанию
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDownIcon className="pointer-events-none mr-2 size-4 shrink-0" />
            По убыванию
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <Input
          value={(columnFilterValue ?? "") as string}
          onChange={(event) => column.setFilterValue(event.target.value)}
          placeholder="Поиск..."
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
