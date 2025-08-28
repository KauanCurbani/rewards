"use client";

import Header from "@/components/header/header";
import LoaderScreen from "@/components/loader-screen";
import { useAuth } from "@/contexts/auth-context";
import { redirect } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <LoaderScreen />;
  if (!isAuthenticated) return redirect("/login");

  return (
    <section>
      <Header />
      {children}
    </section>
  );
}
