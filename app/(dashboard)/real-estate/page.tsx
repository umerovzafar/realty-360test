"use client";

import { useEffect } from "react";

import Link from "next/link";

import { useSession } from "next-auth/react";

import { Container } from "@/components/custom/container";

import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { useRealEstate } from "./_hooks/use-real-estate";

import type { RealEstateColumn } from "./_components/columns";

import { DataTable } from "./_components/data-table";

import { columns } from "./_components/columns";

export default function RealEstatePage() {
  const { data: session } = useSession();

  const { realEstate, fetchRealEstate } = useRealEstate();

  useEffect(() => {
    fetchRealEstate();
  }, [fetchRealEstate]);

  const formattedRealEstate: RealEstateColumn[] =
    realEstate?.map((estate) => {
      return ({
        ...estate,
        id: estate.id.toString(),
        balcony_id: estate.balcony.label,
        condition_id: estate.condition.label,
        district_id: estate.district.label,
        floor_id: estate.floor.label,
        room_id: estate.room.label,
        strorey_id: estate.storey.label,
        type_id: estate.type.label,
        manager_phone: estate.description,
      });
    }) ?? [];
  return (
    <section className="py-12">
      <Container>
        <div className="space-y-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2 text-center md:text-left">
              <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                Недвижимость ({realEstate?.length})
              </h1>
              <p className="text-xl text-muted-foreground">
                Тут вы можете управлять недвижимостью.
              </p>
            </div>
            {session?.user?.role === "ceo" && (
              <Link
                href="/real-estate/create"
                className={buttonVariants({ variant: "default" })}
              >
                Создать
              </Link>
            )}
          </div>
          <Separator />
          <DataTable data={formattedRealEstate} columns={columns} />
        </div>
      </Container>
    </section>
  );
}
