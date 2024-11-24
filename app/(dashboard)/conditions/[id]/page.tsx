"use client";

import { useEffect } from "react";

import { useParams } from "next/navigation";

import { useSession } from "next-auth/react";

import { Container } from "@/components/custom/container";

import { Separator } from "@/components/ui/separator";

import { useConditions } from "../_hooks/use-conditions";

import { AlertModal } from "../_components/alert-modal";

import { ConditionForm } from "./_components/condition-form";

export default function ConditionPage() {
  const { id } = useParams<{ id: string }>();

  const { data: session } = useSession();

  const { condition, fetchCondition } = useConditions();

  useEffect(() => {
    const conditionId = parseInt(id);

    if (!isNaN(conditionId)) {
      fetchCondition(conditionId);
    }

    return () => {
      useConditions.setState({ condition: null });
    };
  }, [fetchCondition, id]);

  return (
    <section className="py-12">
      <Container>
        <div className="space-y-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2 text-center md:text-left">
              <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                {condition ? "Изменения" : "Создать"}
              </h1>
              <p className="text-xl text-muted-foreground">
                Тут вы можете {condition ? "изменить" : "создать"} состояние.
              </p>
            </div>
            {session?.user?.role === "ceo" && condition && (
              <AlertModal id={id} />
            )}
          </div>
          <Separator />
        </div>
        <ConditionForm initialValues={condition} />
      </Container>
    </section>
  );
}
