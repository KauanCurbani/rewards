"use client";
import GradientText from "@/components/gradient-text";
import Logo from "@/components/logo";
import { Title } from "@mui/icons-material";
import { Box, Typography, useTheme } from "@mui/material";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { palette } = useTheme();

  return (
    <Box sx={{ display: "flex", minHeight: "100dvh" }}>
      <Box
        style={{
          background: "url('/bg.webp')",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundPosition: "center",
        }}
        flex={{ xs: 0, md: 1 }}
        flexShrink={0}
        display={{ xs: "none", md: "flex" }}
        flexDirection={"column"}
        justifyContent={"space-between"}
        alignItems={"start"}
        paddingBlockStart="6.25rem"
        paddingBlockEnd="6.875rem"
        paddingInlineStart={"5.625rem"}
        paddingInlineEnd={"5rem"}
      >
        <div
          style={{
            display: "flex",
            height: "100%",
            alignItems: "start",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box width={52} height={52}>
            <Logo color="#002a" />
          </Box>
          <Box>
            <GradientText
              text="Gerencie recompensas e pontos dos usuários_"
              variant="h5"
              color="primary"
              fontWeight={"bold"}
              textTransform={"uppercase"}
              fontSize={{ md: "2rem", lg: "3rem" }}
              gradient={`linear-gradient(45deg,#002e,#002a 50%,${palette.primary.main})`}
            />

            <Typography variant="subtitle1" color="textSecondary">
              Use esta seção para visualizar e gerenciar as recompensas dos usuários.
            </Typography>
          </Box>
        </div>
      </Box>
      <Box
        flex={1}
        display={"flex"}
        flexShrink={0}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={{ xs: "center", md: "start" }}
        padding={{
          xs: "1.5rem",
          md: "2.5rem",
        }}
        // borderLeft={"1px solid #ccc"}
      >
        {children}
      </Box>
    </Box>
  );
}
