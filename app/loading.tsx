"use client";

import { Loader } from "lucide-react";

import { Container } from "@/components/custom/container";

export default function LoadingPage() {
  return (
    <div className="flex h-dvh items-center py-12">
      <Container>
        <div className="flex justify-center">
          <Loader className="animate-spin" />
        </div>
      </Container>
    </div>
  );
}
