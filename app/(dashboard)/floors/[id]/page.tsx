"use client";

import { useEffect } from "react";

import { useParams } from "next/navigation";

import { useSession } from "next-auth/react";

import { Container } from "@/components/custom/container";

import { Separator } from "@/components/ui/separator";

import { useFloors } from "../_hooks/use-floors";

import { AlertModal } from "../_components/alert-modal";

import { FloorForm } from "./_components/floor-form";

export default function FloorPage() {
  const { id } = useParams<{ id: string }>();

  const { data: session } = useSession();

  const { floor, fetchFloor } = useFloors();

  useEffect(() => {
    const floorId = parseInt(id);

    if (!isNaN(floorId)) {
      fetchFloor(floorId);
    }

    return () => {
      useFloors.setState({ floor: null });
    };
  }, [fetchFloor, id]);

  return (
    <section className="py-12">
      <Container>
        <div className="space-y-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2 text-center md:text-left">
              <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                {floor ? "Изменения" : "Создать"}
              </h1>
              <p className="text-xl text-muted-foreground">
                Тут вы можете {floor ? "изменить" : "создать"} этаж.
              </p>
            </div>
            {session?.user?.role === "ceo" && floor && <AlertModal id={id} />}
          </div>
          <Separator />
        </div>
        <FloorForm initialValues={floor} />
      </Container>
    </section>
  );
}
