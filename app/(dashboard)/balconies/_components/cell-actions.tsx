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

import { useBalconies } from "../_hooks/use-balconies";

import type { BalconyColumn } from "./columns";

interface CellActionsProps {
  data: BalconyColumn;
}

export function CellActions({ data }: CellActionsProps) {
  const router = useRouter();

  const { data: session } = useSession();

  const { deleteBalcony } = useBalconies();

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
        <DropdownMenuItem onClick={() => router.push(`/balconies/${data.id}`)}>
          Внести изменения
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={async () => {
            await deleteBalcony(Number(data.id));

            router.replace("/balconies");
          }}
        >
          Удалить
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
