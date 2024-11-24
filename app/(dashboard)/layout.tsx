"use client";

import { PropsWithChildren } from "react";

import Header from "@/components/header";
import Main from "@/components/main";

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <Main>{children}</Main>
    </div>
  );
}
