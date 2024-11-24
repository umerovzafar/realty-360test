import { auth } from "@/auth";

const PROTECTED_ROUTES = [
  /\/balconies\/\w+/,
  /\/conditions\/\w+/,
  /\/districts\/\w+/,
  /\/floors\/\w+/,
  /\/rooms\/\w+/,
  /\/storeys\/\w+/,
  /\/types\/\w+/,
  /\/real-estate\/\w+/,
];

export default auth((req) => {
  if (req.auth && req.nextUrl.pathname === "/sign-in") {
    const newUrl = new URL("/", req.nextUrl.origin);

    return Response.redirect(newUrl);
  }

  if (!req.auth && req.nextUrl.pathname !== "/sign-in") {
    const newUrl = new URL("/sign-in", req.nextUrl.origin);

    return Response.redirect(newUrl);
  }

  if (
    req.auth &&
    PROTECTED_ROUTES.some((route) => req.nextUrl.pathname.match(route))
  ) {
    if (req.auth.user?.role !== "ceo") {
      const newUrl = new URL("/", req.nextUrl.origin);

      return Response.redirect(newUrl);
    }
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
