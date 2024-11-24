"use client";

import { useEffect } from "react";

import { useParams } from "next/navigation";

import { useSession } from "next-auth/react";

import { Container } from "@/components/custom/container";

import { Separator } from "@/components/ui/separator";

import { useBalconies } from "../_hooks/use-balconies";

import { AlertModal } from "../_components/alert-modal";

import { BalconyForm } from "./_components/balcony-form";

export default function BalconyPage() {
  const { id } = useParams<{ id: string }>();

  const { data: session } = useSession();

  const { balcony, fetchBalcony } = useBalconies();

  useEffect(() => {
    const balconyId = parseInt(id);

    if (!isNaN(balconyId)) {
      fetchBalcony(balconyId);
    }

    return () => {
      useBalconies.setState({ balcony: null });
    };
  }, [fetchBalcony, id]);

  return (
    <section className="py-12">
      <Container>
        <div className="space-y-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2 text-center md:text-left">
              <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                {balcony ? "Внешний Изменения" : "Создать"}
              </h1>
              <p className="text-xl text-muted-foreground">
                Тут вы можете {balcony ? "изменить" : "создать"} балкон.
              </p>
            </div>
            {session?.user?.role === "ceo" && balcony && <AlertModal id={id} />}
          </div>
          <Separator />
        </div>
        <BalconyForm initialValues={balcony} />
      </Container>
    </section>
  );
}
