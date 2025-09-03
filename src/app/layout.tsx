import type { Metadata } from "next";
import { DM_Sans, Geist, Geist_Mono, Urbanist } from "next/font/google";
import "./globals.css";
import { server } from "@/mocks/node";
import { createTheme, ThemeProvider } from "@mui/material";
import { AuthProvider } from "@/contexts/auth-context";

const font = DM_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Be Sistemas",
  description: "Plataforma de recompensas ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (process.env.NEXT_PUBLIC_NODE_ENV === "development") {
    server.listen();
  }

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={font.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
