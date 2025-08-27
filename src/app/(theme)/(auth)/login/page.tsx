"use client";
import { Error, Visibility, VisibilityOff } from "@mui/icons-material";
import { Alert, Box, Button, Divider, IconButton, TextField, Typography } from "@mui/material";
import Link from "next/link";
import React, { ReactNode, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/lib/api";
import { AxiosError } from "axios";

const schema = z.object({
  cpf: z
    .string()
    .min(11, { message: "CPF deve ter 11 dígitos" })
    .max(11, { message: "CPF deve ter 11 dígitos" }),
  password: z
    .string()
    .min(6, { message: "Senha deve ter pelo menos 6 caracteres" })
    .max(100, { message: "Senha deve ter no máximo 100 caracteres" }),
});

type FormData = z.infer<typeof schema>;

export default function Page() {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      cpf: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: FormData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await api.post("/login", data);
      console.log(response);
    } catch (error) {
      if (error instanceof AxiosError) {
        form.setError("root", { message: error.message });
      } else {
        form.setError("root", { message: "Erro desconhecido" });
      }
    }
  };

  return (
    <Box>
      <Typography variant="h5" color="primary">
        Entrar
      </Typography>
      <Typography variant="caption" color="textSecondary">
        Use suas credenciais para acessar o painel.
      </Typography>

      <Divider style={{ margin: "16px 0" }} />
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Box marginBottom={2}>
          {form.formState.errors.root && (
            <Alert variant="outlined" color="error" icon={<Error />}>
              <Typography variant="body1">{form.formState.errors.root.message}</Typography>
            </Alert>
          )}
        </Box>
        <Controller
          control={form.control}
          name="cpf"
          render={({ field }) => (
            <TextField
              {...field}
              label="CPF"
              type="text"
              fullWidth
              margin="normal"
              required
              error={!!form.formState.errors.cpf}
              helperText={form.formState.errors.cpf?.message}
            />
          )}
        />
        <Controller
          control={form.control}
          name="password"
          render={({ field }) => (
            <>
              <TextField
                {...field}
                label="Senha"
                type={showPassword ? "text" : "password"}
                fullWidth
                margin="normal"
                error={!!form.formState.errors.password}
                helperText={form.formState.errors.password?.message}
                slotProps={{
                  input: {
                    endAdornment: (
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        aria-label="toggle password visibility"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    ),
                  },
                }}
              />
            </>
          )}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          loading={form.formState.isSubmitting}
        >
          Entrar
        </Button>
      </form>
    </Box>
  );
}
