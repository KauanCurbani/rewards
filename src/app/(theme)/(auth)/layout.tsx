import { Title } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: "flex", minHeight: "100dvh" }}>
      <Box
        flex={{ xs: 0, md: 1, lg: 2 }}
        display={{ xs: "none", md: "flex" }}
        flexDirection={"column"}
        justifyContent={"end"}
        alignItems={"start"}
        padding={4}
        bgcolor={"ButtonFace"}
      >
        <Typography variant="h5" color="primary">
          Painel de administração: gerencie recompensas e pontos dos usuários.
        </Typography>
        <Typography variant="caption" color="textSecondary">
          Use esta seção para visualizar e gerenciar as recompensas dos usuários.
        </Typography>
      </Box>
      <Box
        flex={1}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={{ xs: "center", md: "start" }}
        padding={4}
        borderLeft={"1px solid #ccc"}
      >
        {children}
      </Box>
    </Box>
  );
}
