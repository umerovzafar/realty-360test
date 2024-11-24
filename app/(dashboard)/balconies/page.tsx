"use client";

import { useEffect } from "react";

import Link from "next/link";

import { useSession } from "next-auth/react";

import { Container } from "@/components/custom/container";

import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { useBalconies } from "./_hooks/use-balconies";

import { DataTable } from "../_components/ui/data-table";

import type { BalconyColumn } from "./_components/columns";

import { columns } from "./_components/columns";

export default function BalconiesPage() {
  const { data: session } = useSession();

  const { balconies, fetchBalconies } = useBalconies();

  useEffect(() => {
    fetchBalconies();
  }, [fetchBalconies]);

  const formattedBalconies: BalconyColumn[] =
    balconies?.map((balcony) => ({
      id: balcony.id.toString(),
      label: balcony.label,
    })) ?? [];

  return (
    <section className="py-12">
      <Container>
        <div className="space-y-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2 text-center md:text-left">
              <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                Балконы ({balconies?.length})
              </h1>
              <p className="text-xl text-muted-foreground">
                Тут вы можете управлять балконами.
              </p>
            </div>
            {session?.user?.role === "ceo" && (
              <Link
                href="/balconies/create"
                className={buttonVariants({ variant: "default" })}
              >
                Создать
              </Link>
            )}
          </div>
          <Separator />
          <DataTable data={formattedBalconies} columns={columns} />
        </div>
      </Container>
    </section>
  );
}
