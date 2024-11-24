"use client";

import { useRouter } from "next/navigation";

import { useSession } from "next-auth/react";

import { MoreHorizontalIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { useDistricts } from "../_hooks/use-districts";

import type { DistrictColumn } from "./columns";

interface CellActionsProps {
  data: DistrictColumn;
}

export function CellActions({ data }: CellActionsProps) {
  const router = useRouter();

  const { data: session } = useSession();

  const { deleteDistrict } = useDistricts();

  if (session?.user?.role !== "ceo") {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Открыть меню</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => router.push(`/districts/${data.id}`)}>
          Внести изменения
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={async () => {
            await deleteDistrict(Number(data.id));

            router.replace("/districts");
          }}
        >
          Удалить
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
