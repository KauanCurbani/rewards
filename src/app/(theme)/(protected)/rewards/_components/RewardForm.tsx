"use client";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
  Paper,
  Alert,
  Stack,
  FormHelperText,
} from "@mui/material";
import {
  rewardFormSchema,
  RewardFormData,
  REWARD_CATEGORIES,
  CATEGORY_LABELS,
  RewardCategory,
} from "@/domain/entities/rewardFormSchema";

interface RewardFormProps {
  initialData?: Partial<RewardFormData>;
  onSubmit: (data: RewardFormData) => Promise<void>;
  isLoading?: boolean;
  submitText?: string;
  title: string;
  error?: string | null;
  success?: string | null;
}

export function RewardForm({
  initialData,
  onSubmit,
  isLoading = false,
  submitText = "Salvar",
  title,
  error,
  success,
}: RewardFormProps) {
  const form = useForm<RewardFormData>({
    resolver: zodResolver(rewardFormSchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      imageUrl: initialData?.imageUrl || "",
      pointsRequired: initialData?.pointsRequired || 1,
      category: initialData?.category || RewardCategory.OUTROS,
      expiresAt: initialData?.expiresAt || null,
    },
    mode: "onChange",
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = form;

  const handleFormSubmit = async (data: RewardFormData) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleFormSubmit)}
      sx={{ maxWidth: 600, mx: "auto", p: 3 }}
    >
      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {title}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        <Stack spacing={3}>
          {/* Nome */}
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Nome da Recompensa"
                fullWidth
                required
                error={!!errors.name}
                helperText={errors.name?.message}
                disabled={isLoading}
                placeholder="Digite o nome da recompensa"
              />
            )}
          />

          {/* Descrição */}
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Descrição"
                fullWidth
                required
                multiline
                rows={4}
                error={!!errors.description}
                helperText={errors.description?.message}
                disabled={isLoading}
                placeholder="Descreva a recompensa"
              />
            )}
          />

          {/* URL da Imagem */}
          <Controller
            name="imageUrl"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="URL da Imagem (Opcional)"
                fullWidth
                type="url"
                error={!!errors.imageUrl}
                helperText={errors.imageUrl?.message}
                disabled={isLoading}
                placeholder="https://exemplo.com/imagem.jpg"
              />
            )}
          />

          {/* Pontos Requeridos */}
          <Controller
            name="pointsRequired"
            control={control}
            render={({ field: { onChange, ...field } }) => (
              <TextField
                {...field}
                label="Pontos Requeridos"
                fullWidth
                required
                type="number"
                inputProps={{ min: 1, step: 1 }}
                error={!!errors.pointsRequired}
                helperText={errors.pointsRequired?.message}
                disabled={isLoading}
                onChange={(e) => {
                  const value = parseInt(e.target.value, 10);
                  onChange(isNaN(value) ? 1 : value);
                }}
              />
            )}
          />

          {/* Categoria */}
          <FormControl fullWidth required error={!!errors.category}>
            <InputLabel id="category-label">Categoria</InputLabel>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select {...field} labelId="category-label" label="Categoria" disabled={isLoading}>
                  {REWARD_CATEGORIES.map((category) => (
                    <MenuItem key={category} value={category}>
                      {CATEGORY_LABELS[category]}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            {errors.category && <FormHelperText>{errors.category.message}</FormHelperText>}
          </FormControl>

          {/* Data de Expiração */}
          <Controller
            name="expiresAt"
            control={control}
            render={({ field: { onChange, value, ...field } }) => (
              <TextField
                {...field}
                label="Data de Expiração (Opcional)"
                fullWidth
                type="date"
                InputLabelProps={{ shrink: true }}
                inputProps={{
                  min: new Date().toISOString().split("T")[0],
                }}
                value={value ? new Date(value).toISOString().split("T")[0] : ""}
                onChange={(e) => {
                  const date = e.target.value ? new Date(e.target.value) : null;
                  onChange(date);
                }}
                error={!!errors.expiresAt}
                helperText={errors.expiresAt?.message}
                disabled={isLoading}
              />
            )}
          />

          {/* Botões */}
          <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading || !isValid}
              fullWidth
              size="large"
              sx={{ py: 1.5 }}
            >
              {isLoading ? "Salvando..." : submitText}
            </Button>

            <Button
              variant="outlined"
              disabled={isLoading}
              onClick={() => window.history.back()}
              size="large"
              sx={{ py: 1.5, minWidth: 120 }}
            >
              Cancelar
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
}
