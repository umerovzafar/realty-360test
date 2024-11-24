"use client";

import { Account } from "@/components/account";
import Navbar from "@/components/navbar";

import { Container } from "@/components/custom/container";

const Header = () => {
  return (
    <header className="sticky left-0 top-0 z-50 border-b border-border/40 bg-background/95 pt-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-border">
      <Container>
        <div className="space-y-4">
          <div className="flex justify-end">
            <Account />
          </div>
          <Navbar />
        </div>
      </Container>
    </header>
  );
};

export default Header;
