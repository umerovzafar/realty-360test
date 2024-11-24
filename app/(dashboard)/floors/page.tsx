"use client";

import { useEffect } from "react";

import Link from "next/link";

import { useSession } from "next-auth/react";

import { Container } from "@/components/custom/container";

import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { useFloors } from "./_hooks/use-floors";

import { DataTable } from "../_components/ui/data-table";

import type { FloorColumn } from "./_components/columns";

import { columns } from "./_components/columns";

export default function FloorsPage() {
  const { data: session } = useSession();

  const { floors, fetchFloors } = useFloors();

  useEffect(() => {
    fetchFloors();
  }, [fetchFloors]);

  const formattedFloors: FloorColumn[] =
    floors?.map((floor) => ({
      id: floor.id.toString(),
      label: floor.label,
    })) ?? [];

  return (
    <section className="py-12">
      <Container>
        <div className="space-y-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2 text-center md:text-left">
              <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                Этажи ({floors?.length})
              </h1>
              <p className="text-xl text-muted-foreground">
                Тут вы можете управлять этажами.
              </p>
            </div>
            {session?.user?.role === "ceo" && (
              <Link
                href="/floors/create"
                className={buttonVariants({ variant: "default" })}
              >
                Создать
              </Link>
            )}
          </div>
          <Separator />
          <DataTable data={formattedFloors} columns={columns} />
        </div>
      </Container>
    </section>
  );
}
