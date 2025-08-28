"use client"
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";

export default function AppThemeProvider({ children }: { children: React.ReactNode }) {
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
