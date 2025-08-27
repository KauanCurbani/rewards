"use client";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, Divider, IconButton, TextField, Typography } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";

export default function Page() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box>
      <Typography variant="h5" color="primary">
        Entrar
      </Typography>
      <Typography variant="caption" color="textSecondary">
        Use suas credenciais para acessar o painel.
      </Typography>

      <Divider style={{ margin: "16px 0" }} />

      <form>
        <TextField label="CPF" type="text" fullWidth margin="normal" required />
        <TextField
          label="Senha"
          type={showPassword ? "text" : "password"}
          fullWidth
          margin="normal"
          required
          slotProps={{
            input: {
              endAdornment: (
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            },
          }}
        />

        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Entrar
        </Button>
      </form>
    </Box>
  );
}
