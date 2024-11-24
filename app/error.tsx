"use client";

import { useEffect } from "react";

import { Container } from "@/components/custom/container";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-dvh items-center py-12">
      <Container>
        <div className="flex flex-col items-center gap-y-4">
          <div className="space-y-2 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
              Что-то пошло не так
            </h1>
            <p className="text-xl text-muted-foreground">
              Попробуйте обновить страницу или повторить попытку позже.
            </p>
          </div>
          <Button onClick={() => reset()} variant="outline">
            Попробовать снова
          </Button>
        </div>
      </Container>
    </div>
  );
}
