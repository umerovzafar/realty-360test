"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "../../_components/ui/data-table-column-header";

import { CellActions } from "./cell-actions";

export type FloorColumn = {
  id: string;
  label: string;
};

export const columns: ColumnDef<FloorColumn>[] = [
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Название" />
    ),
    accessorKey: "label",
    meta: {
      filterVariant: "text",
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellActions data={row.original} />,
  },
];
