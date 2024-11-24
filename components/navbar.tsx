"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { buttonVariants } from "@/components/ui/button";

const ROUTES = [
  {
    id: 1,
    label: "Балконы",
    href: "/balconies",
  },
  {
    id: 2,
    label: "Состояния",
    href: "/conditions",
  },
  {
    id: 3,
    label: "Районы",
    href: "/districts",
  },
  {
    id: 4,
    label: "Этажи",
    href: "/floors",
  },
  {
    id: 5,
    label: "Комнаты",
    href: "/rooms",
  },
  {
    id: 6,
    label: "Этажность",
    href: "/storeys",
  },
  {
    id: 7,
    label: "Типы",
    href: "/types",
  },
  {
    id: 8,
    label: "Недвижимость",
    href: "/real-estate",
  },
];

const Navbar = () => {
  const pathname = usePathname();

  return (
    <ScrollArea className="whitespace-nowrap">
      <nav className="pb-4">
        {ROUTES.map((route) => (
          <Link
            key={route.id}
            href={route.href}
            className={buttonVariants({
              variant: "link",
              className: cn(
                "first:pl-0 last:pr-0",
                route.href === pathname && "underline",
              ),
            })}
          >
            {route.label}
          </Link>
        ))}
      </nav>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default Navbar;
