"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "../../_components/ui/data-table-column-header";

import { CellActions } from "./cell-actions";

export type RealEstateColumn = {
  id: string;
  name: string;
  description: string | null;
  notes: string | null;
  price: string;
  owner_phone: string | null;
  manager_phone: string | null;
  realtor_phone: string | null;
  balcony_id: string;
  condition_id: string;
  district_id: string;
  floor_id: string;
  room_id: string;
  strorey_id: string;
  type_id: string;
};

export const columns: ColumnDef<RealEstateColumn>[] = [
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Название" />
    ),
    accessorKey: "name",
    meta: {
      filterVariant: "text",
    },
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Описание" />
    ),
    accessorKey: "description",
    meta: {
      filterVariant: "text",
    },
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Заметки" />
    ),
    accessorKey: "notes",
    meta: {
      filterVariant: "text",
    },
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Цена" />
    ),
    accessorKey: "price",
    meta: {
      filterVariant: "text",
    },
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Номер владельца" />
    ),
    accessorKey: "owner_phone",
    meta: {
      filterVariant: "text",
    },
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Номер руководителя" />
    ),
    accessorKey: "manager_phone",
    meta: {
      filterVariant: "text",
    },
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Номер риелтора" />
    ),
    accessorKey: "realtor_phone",
    meta: {
      filterVariant: "text",
    },
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Балкон" />
    ),
    accessorKey: "balcony_id",
    meta: {
      filterVariant: "text",
    },
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Состояние" />
    ),
    accessorKey: "condition_id",
    meta: {
      filterVariant: "text",
    },
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Район" />
    ),
    accessorKey: "district_id",
    meta: {
      filterVariant: "text",
    },
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Этаж" />
    ),
    accessorKey: "floor_id",
    meta: {
      filterVariant: "text",
    },
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Комната" />
    ),
    accessorKey: "room_id",
    meta: {
      filterVariant: "text",
    },
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Этажность" />
    ),
    accessorKey: "storey.label",
    meta: {
      filterVariant: "text",
    },
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Тип" />
    ),
    accessorKey: "type_id",
    meta: {
      filterVariant: "text",
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellActions data={row.original} />,
  },
];
