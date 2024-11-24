import { NextResponse } from "next/server";

import { auth } from "@/auth";

const PROTECTED_ROUTES = [
  /\/balconies\/\w+/,
  /\/conditions\/\w+/,
  /\/districts\/\w+/,
  /\/floors\/\w+/,
  /\/types\/\w+/,
  /\/rooms\/\w+/,
  /\/storeys\/\w+/,
  /\/real-estate\/\w+/,
];

export default auth((req) => {
  const isAuthenticated = !!req.auth;

  const isAuthPage = req.nextUrl.pathname.startsWith("/sign-in");

  if (isAuthenticated && isAuthPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!isAuthenticated && !isAuthPage) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  if (
    PROTECTED_ROUTES.some((pattern) => req.nextUrl.pathname.match(pattern)) &&
    req.auth?.user?.role === "employee"
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
