"use client";

import { useEffect } from "react";

import { useParams } from "next/navigation";

import { useSession } from "next-auth/react";

import { Container } from "@/components/custom/container";

import { Separator } from "@/components/ui/separator";

import { useStoreys } from "../_hooks/use-storeys";

import { AlertModal } from "../_components/alert-modal";

import { StoreyForm } from "./_components/storey-form";

export default function StoreyPage() {
  const { id } = useParams<{ id: string }>();

  const { data: session } = useSession();

  const { storey, fetchStorey } = useStoreys();

  useEffect(() => {
    const storeyId = parseInt(id);

    if (!isNaN(storeyId)) {
      fetchStorey(storeyId);
    }

    return () => {
      useStoreys.setState({ storey: null });
    };
  }, [fetchStorey, id]);

  return (
    <section className="py-12">
      <Container>
        <div className="space-y-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2 text-center md:text-left">
              <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                {storey ? "Изменения" : "Создать"}
              </h1>
              <p className="text-xl text-muted-foreground">
                Тут вы можете {storey ? "изменить" : "создать"} этажность.
              </p>
            </div>
            {session?.user?.role === "ceo" && storey && <AlertModal id={id} />}
          </div>
          <Separator />
        </div>
        <StoreyForm initialValues={storey} />
      </Container>
    </section>
  );
}
