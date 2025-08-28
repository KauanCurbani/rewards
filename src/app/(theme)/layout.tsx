"use client";

import React, { useEffect } from "react";
import { Box, createTheme, ThemeProvider } from "@mui/material";
import LoaderScreen from "@/components/loader-screen";

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
    <ThemeProvider
      theme={createTheme({
        palette: {
          primary: {
            main: "#1E7BF4",
          },
          secondary: {
            main: "#dc004e",
          },
        },
        shape: {
          borderRadius: 8,
        },
        typography: {
          fontFamily: "'DM Sans', 'Helvetica', 'Arial', sans-serif",
        },

        components: {
          MuiTextField: {
            defaultProps: {
              variant: "outlined",
              fullWidth: true,
              size: "small",
              slotProps: { inputLabel: { shrink: true } },
            },
          },
        },
      })}
    >
      {children}
    </ThemeProvider>
  );
}
