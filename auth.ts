import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { signInSchema } from "@/schemas/sign-in-schema";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: "Имя Пользователя", type: "text" },
        password: { label: "Пароль", type: "text" },
      },
      async authorize(credentials) {
        try {
          const { name, password } = await signInSchema.parseAsync(credentials);

          if (
            name === process.env.AUTH_CEO_NAME &&
            password === process.env.AUTH_CEO_PASSWORD
          ) {
            return { name, role: "ceo" };
          } else if (
            name === process.env.AUTH_EMPLOYEE_NAME &&
            password === process.env.AUTH_EMPLOYEE_PASSWORD
          ) {
            return { name, role: "employee" };
          }

          return null;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.name = user.name;
        token.role = user.role;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.name = token.name;
        session.user.role = token.role;
      }

      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
});
