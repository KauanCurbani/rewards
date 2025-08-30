"use client";

import LoaderScreen from "@/components/loader-screen";
import AppThemeProvider from "@/contexts/app-theme-provider";
import { NotificationsProvider } from "@toolpad/core";
import React, { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [workerReady, setWorkerReady] = React.useState(false);
  const f = async () => {
    const { worker } = await import("@/mocks/browser");
    // await worker.start();
    setWorkerReady(true);
  };

  useEffect(() => {
    f();
  }, []);

  if (!workerReady) return <LoaderScreen />;

  return (
    <AppThemeProvider>
      <NotificationsProvider slotProps={{ snackbar: { autoHideDuration: 3000 } }}>
        {children}
      </NotificationsProvider>
    </AppThemeProvider>
  );
}
