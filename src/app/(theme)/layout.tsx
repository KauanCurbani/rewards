"use client";

import React, { useEffect } from "react";
import { Box, createTheme, ThemeProvider } from "@mui/material";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [workerReady, setWorkerReady] = React.useState(false);

  useEffect(() => {
    const f = async () => {
      if (process.env.NODE_ENV === "development") {
        // Dynamically import only in the browser
        const { worker } = await import("@/mocks/browser");
        await worker.start();
        setWorkerReady(true);
      }
    };

    f();
  }, []);

  if (!workerReady) {
    return <Box>Loading...</Box>;
  }

  return (
    <ThemeProvider
      theme={createTheme({
        palette: {
          primary: {
            main: "#2554b0",
          },
          secondary: {
            main: "#dc004e",
          },
        },
        shape: {
          borderRadius: 8,
        },
        typography: {
          fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
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
