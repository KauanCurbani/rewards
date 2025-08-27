"use client";

import React from "react";
import { createTheme, ThemeProvider } from "@mui/material";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      theme={createTheme({
        components: {
          MuiTextField: {
            defaultProps: {
              variant: "outlined",
              fullWidth: true,
              size: "small",
              slotProps: { inputLabel: { shrink: true } },
            },
            styleOverrides: {
              root: {
                borderRadius: "12px",
              },
            },
          },
        },
      })}
    >
      {children}
    </ThemeProvider>
  );
}
