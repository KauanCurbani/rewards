"use client";

import React, { useEffect } from "react";
import { Box, createTheme, ThemeProvider } from "@mui/material";
import LoaderScreen from "@/components/loader-screen";
import AppThemeProvider from "@/contexts/app-theme-provider";
import { NotificationsProvider } from "@toolpad/core";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [workerReady, setWorkerReady] = React.useState(false);

  useEffect(() => {
    const f = async () => {
      const { worker } = await import("@/mocks/browser");
      await worker.start();
      setWorkerReady(true);
    };

    f();
  }, []);

  // if (!workerReady) return <LoaderScreen />;

  return (
    <AppThemeProvider>
      <NotificationsProvider slotProps={{ snackbar: { autoHideDuration: 3000 } }}>
        {children}
      </NotificationsProvider>
    </AppThemeProvider>
  );
}
