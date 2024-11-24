"use client";

import { useEffect } from "react";

import { useParams } from "next/navigation";

import { useSession } from "next-auth/react";

import { Container } from "@/components/custom/container";

import { Separator } from "@/components/ui/separator";

import { useRealEstate } from "../_hooks/use-real-estate";

import { AlertModal } from "../_components/alert-modal";

import { EstateForm } from "./_components/estate-form";

export default function EstatePage() {
  const { id } = useParams<{ id: string }>();

  const { data: session } = useSession();

  const { estate, fetchEstate } = useRealEstate();

  useEffect(() => {
    const estateId = parseInt(id);

    if (!isNaN(estateId)) {
      fetchEstate(estateId);
    }
    return () => {
      useRealEstate.setState({ estate: null });
    };
  }, [fetchEstate, id]);

  return (
    <section className="py-12">
      <Container>
        <div className="space-y-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2 text-center md:text-left">
              <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                {estate ? "Изменения" : "Создать"}
              </h1>
              <p className="text-xl text-muted-foreground">
                Тут вы можете {estate ? "изменить" : "создать"} объект
                недвижимости.
              </p>
            </div>
            {session?.user?.role === "ceo" && estate && <AlertModal id={id} />}
          </div>
          <Separator />
        </div>
        <EstateForm initialValues={estate} />
      </Container>
    </section>
  );
}
