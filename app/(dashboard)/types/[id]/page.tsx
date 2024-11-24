"use client";

import { useEffect } from "react";

import { useParams } from "next/navigation";

import { useSession } from "next-auth/react";

import { Container } from "@/components/custom/container";

import { Separator } from "@/components/ui/separator";

import { useTypes } from "../_hooks/use-types";

import { AlertModal } from "../_components/alert-modal";

import { TypeForm } from "./_components/type-form";

export default function TypePage() {
  const { id } = useParams<{ id: string }>();

  const { data: session } = useSession();

  const { type, fetchType } = useTypes();

  useEffect(() => {
    const typeId = parseInt(id);

    if (!isNaN(typeId)) {
      fetchType(typeId);
    }

    return () => {
      useTypes.setState({ type: null });
    };
  }, [fetchType, id]);

  return (
    <section className="py-12">
      <Container>
        <div className="space-y-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2 text-center md:text-left">
              <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                {type ? "Изменения" : "Создать"}
              </h1>
              <p className="text-xl text-muted-foreground">
                Тут вы можете {type ? "изменить" : "создать"} тип.
              </p>
            </div>
            {session?.user?.role === "ceo" && type && <AlertModal id={id} />}
          </div>
          <Separator />
        </div>
        <TypeForm initialValues={type} />
      </Container>
    </section>
  );
}
