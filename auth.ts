import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { signInSchema } from "@/app/(auth)/sign-in/_schemas/sign-in-shema";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        name: { label: "Имя", type: "text" },
        password: { label: "Пароль", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { name, password } = await signInSchema.parseAsync(credentials);

          if (
            name === process.env.AUTH_CEO_NAME &&
            password === process.env.AUTH_CEO_PASSWORD
          ) {
            return { role: "ceo" };
          }

          if (
            name === process.env.AUTH_EMPLOYEE_NAME &&
            password === process.env.AUTH_EMPLOYEE_PASSWORD
          ) {
            return { role: "employee" };
          }

          return null;
        } catch (error) {
          throw error;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    authorized: ({ auth }) => {
      return !!auth;
    },
    jwt: ({ token, user }) => {
      if (user) {
        token.role = user.role;
      }

      return token;
    },
    session: ({ session, token }) => {
      if (token.role) {
        session.user.role = token.role;
      }

      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
});
