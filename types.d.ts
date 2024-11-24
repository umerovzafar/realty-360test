declare module "next-auth" {
  interface User {
    role?: "ceo" | "employee";
  }
}

import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    role?: "ceo" | "employee";
  }
}

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: "text";
  }
}
