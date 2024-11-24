"use client";

import { useEffect } from "react";

import Link from "next/link";

import { useSession } from "next-auth/react";

import { Container } from "@/components/custom/container";

import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { useDistricts } from "./_hooks/use-districts";

import { DataTable } from "../_components/ui/data-table";

import type { DistrictColumn } from "./_components/columns";

import { columns } from "./_components/columns";

export default function DistrictsPage() {
  const { data: session } = useSession();

  const { districts, fetchDistricts } = useDistricts();

  useEffect(() => {
    fetchDistricts();
  }, [fetchDistricts]);

  const formattedDistricts: DistrictColumn[] =
    districts?.map((district) => ({
      id: district.id.toString(),
      label: district.label,
    })) ?? [];

  return (
    <section className="py-12">
      <Container>
        <div className="space-y-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2 text-center md:text-left">
              <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                Районы ({districts?.length})
              </h1>
              <p className="text-xl text-muted-foreground">
                Тут вы можете управлять районами.
              </p>
            </div>
            {session?.user?.role === "ceo" && (
              <Link
                href="/districts/create"
                className={buttonVariants({ variant: "default" })}
              >
                Создать
              </Link>
            )}
          </div>
          <Separator />
          <DataTable data={formattedDistricts} columns={columns} />
        </div>
      </Container>
    </section>
  );
}
