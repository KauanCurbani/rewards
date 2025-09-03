"use client";
import React from "react";
import { Box, Skeleton, Stack, Paper, Divider } from "@mui/material";

export function RewardsFilterSkeleton() {
  return (
    <Paper
      elevation={1}
      sx={{
        width: { xs: "100%", sm: 280 },
        marginRight: { sm: 2 },
        marginBottom: { xs: 2, sm: 0 },
        padding: 2,
        height: "fit-content",
        position: { sm: "sticky" },
        top: { sm: 16 },
      }}
    >
      <Stack spacing={3}>
        {/* Cabeçalho skeleton */}
        <Box display="flex" alignItems="center" gap={1}>
          <Skeleton variant="circular" width={24} height={24} />
          <Skeleton variant="text" width={80} height={28} />
        </Box>

        <Divider />

        {/* Campo de busca skeleton */}
        <Box>
          <Skeleton variant="text" width={120} height={20} sx={{ mb: 1 }} />
          <Skeleton variant="rectangular" width="100%" height={40} sx={{ borderRadius: 2 }} />
        </Box>

        {/* Filtro por categoria skeleton */}
        <Box>
          <Skeleton variant="text" width={80} height={20} sx={{ mb: 1 }} />
          <Skeleton variant="rectangular" width="100%" height={40} sx={{ borderRadius: 2 }} />
        </Box>

        {/* Slider para faixa de pontos skeleton */}
        <Box>
          <Skeleton variant="text" width={100} height={20} sx={{ mb: 1 }} />
          <Box sx={{ px: 1, mt: 2 }}>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Skeleton variant="text" width={40} height={16} />
              <Skeleton variant="text" width={40} height={16} />
            </Box>
            {/* Slider track skeleton */}
            <Box sx={{ position: "relative", mt: 2, mb: 2 }}>
              <Skeleton variant="rectangular" width="100%" height={4} sx={{ borderRadius: 2 }} />
              {/* Slider thumbs skeleton */}
              <Skeleton
                variant="circular"
                width={20}
                height={20}
                sx={{
                  position: "absolute",
                  top: -8,
                  left: "20%",
                }}
              />
              <Skeleton
                variant="circular"
                width={20}
                height={20}
                sx={{
                  position: "absolute",
                  top: -8,
                  right: "20%",
                }}
              />
            </Box>
            {/* Marks skeleton */}
            <Box display="flex" justifyContent="space-between">
              <Skeleton variant="text" width={12} height={14} />
              <Skeleton variant="text" width={20} height={14} />
            </Box>
          </Box>
        </Box>

        {/* Select para ordenação skeleton */}
        <Box>
          <Skeleton variant="text" width={90} height={20} sx={{ mb: 1 }} />
          <Skeleton variant="rectangular" width="100%" height={40} sx={{ borderRadius: 2 }} />
        </Box>

        {/* Botão aplicar filtros skeleton */}
        <Box>
          <Skeleton
            variant="rectangular"
            width="100%"
            height={48}
            sx={{ borderRadius: 2, mt: 1 }}
          />
        </Box>
      </Stack>
    </Paper>
  );
}
