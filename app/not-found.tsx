"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { ArrowLeft } from "lucide-react";

import { Container } from "@/components/custom/container";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  const [isClient, setIsClient] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="flex h-dvh items-center py-12">
      <Container>
        <div className="flex flex-col items-center gap-y-4">
          <div className="space-y-2 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
              Страница не найдена
            </h1>
            <p className="text-xl text-muted-foreground">
              Страница, которую вы ищете, не существует.
            </p>
          </div>
          <Button onClick={() => router.back()} variant="outline">
            <ArrowLeft />
            Назад
          </Button>
        </div>
      </Container>
    </div>
  );
}
