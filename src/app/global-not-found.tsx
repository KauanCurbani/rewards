"use client";
import Logo from "@/components/logo";
import AppThemeProvider from "@/contexts/app-theme-provider";
import { Box, Button, Typography } from "@mui/material";
import "./globals.css";
export default function GlobalNotFound() {
  return (
    <html lang="en">
      <AppThemeProvider>
        <body
          style={{
            minHeight: "100dvh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              height: "100%",
              width: "100%",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "url('/bg.webp')",
              backgroundPosition: "center",
              backgroundSize: "cover",
              zIndex: -1,
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                backdropFilter: "blur(40px)",
                background: "rgba(255, 255, 255, 0.75)",
              }}
            />
          </div>
          <Logo size={44} />

          <Box display={"flex"} flexDirection={"column"} alignItems={"center"} paddingInline={4}>
            <Typography variant="h6" fontWeight={"bold"} color="primary">
              PAGINA NÃO ENCONTRADA_
            </Typography>
            <Typography variant="caption" color="textSecondary" textAlign={"center"}>
              Desculpe, mas não conseguimos encontrar a página que você está procurando.
            </Typography>
          </Box>

          <Button variant="text" color="primary" href="/">
            Voltar ao início
          </Button>
        </body>
      </AppThemeProvider>
    </html>
  );
}
