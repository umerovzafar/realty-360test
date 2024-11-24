"use client";

import { useEffect } from "react";

import { useParams } from "next/navigation";

import { useSession } from "next-auth/react";

import { Container } from "@/components/custom/container";

import { Separator } from "@/components/ui/separator";

import { useDistricts } from "../_hooks/use-districts";

import { AlertModal } from "../_components/alert-modal";

import { DistrictForm } from "./_components/district-form";

export default function DistrictPage() {
  const { id } = useParams<{ id: string }>();

  const { data: session } = useSession();

  const { district, fetchDistrict } = useDistricts();

  useEffect(() => {
    const districtId = parseInt(id);

    if (!isNaN(districtId)) {
      fetchDistrict(districtId);
    }

    return () => {
      useDistricts.setState({ district: null });
    };
  }, [fetchDistrict, id]);

  return (
    <section className="py-12">
      <Container>
        <div className="space-y-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2 text-center md:text-left">
              <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                {district ? "Изменения" : "Создать"}
              </h1>
              <p className="text-xl text-muted-foreground">
                Тут вы можете {district ? "изменить" : "создать"} район.
              </p>
            </div>
            {session?.user?.role === "ceo" && district && (
              <AlertModal id={id} />
            )}
          </div>
          <Separator />
        </div>
        <DistrictForm initialValues={district} />
      </Container>
    </section>
  );
}
