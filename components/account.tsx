"use client";

import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";

import { User, UserCog } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function Account() {
  const { data: session } = useSession();

  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          {session?.user?.role === "ceo" ? <UserCog /> : <User />}
          <span className="sr-only">Аккаунт</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Темная
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Светлая
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            Системная
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>Выйти</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
