import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/app/styles/globals.css";

import { SessionProvider } from "next-auth/react";

import { auth } from "./auth";

import { ThemeProvider } from "@/app/providers/theme-provider";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const fontSans = localFont({
  src: "./fonts/GeistVF.woff",
  weight: "400 800",
  variable: "--font-sans",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={fontSans.variable}>
        <SessionProvider session={session}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
