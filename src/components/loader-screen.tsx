import { Box, CircularProgress } from "@mui/material";
import React from "react";
import Logo from "./logo";

export default function LoaderScreen() {
  return (
    <Box display={"flex"} alignItems={"center"} justifyContent={"center"} minHeight={"100dvh"}>
      <Box width={20} height={20}>
        <Logo />
      </Box>
      <CircularProgress style={{ position: "absolute" }} />
    </Box>
  );
}
