"use client";

import { useEffect } from "react";

import Link from "next/link";

import { useSession } from "next-auth/react";

import { Container } from "@/components/custom/container";

import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { useTypes } from "./_hooks/use-types";

import { DataTable } from "../_components/ui/data-table";

import type { TypeColumn } from "./_components/columns";

import { columns } from "./_components/columns";

export default function TypesPage() {
  const { data: session } = useSession();

  const { types, fetchTypes } = useTypes();

  useEffect(() => {
    fetchTypes();
  }, [fetchTypes]);

  const formattedTypes: TypeColumn[] =
    types?.map((type) => ({
      id: type.id.toString(),
      label: type.label,
    })) ?? [];

  return (
    <section className="py-12">
      <Container>
        <div className="space-y-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2 text-center md:text-left">
              <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                Типы ({types?.length})
              </h1>
              <p className="text-xl text-muted-foreground">
                Тут вы можете управлять типами.
              </p>
            </div>
            {session?.user?.role === "ceo" && (
              <Link
                href="/types/create"
                className={buttonVariants({ variant: "default" })}
              >
                Создать
              </Link>
            )}
          </div>
          <Separator />
          <DataTable data={formattedTypes} columns={columns} />
        </div>
      </Container>
    </section>
  );
}
