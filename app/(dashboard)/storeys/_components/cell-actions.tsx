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

import { useStoreys } from "../_hooks/use-storeys";

import type { StoreyColumn } from "./columns";

interface CellActionsProps {
  data: StoreyColumn;
}

export function CellActions({ data }: CellActionsProps) {
  const router = useRouter();

  const { data: session } = useSession();

  const { deleteStorey } = useStoreys();

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
        <DropdownMenuItem onClick={() => router.push(`/storeys/${data.id}`)}>
          Внести изменения
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={async () => {
            await deleteStorey(Number(data.id));

            router.replace("/storeys");
          }}
        >
          Удалить
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
