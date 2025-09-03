"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { RewardForm } from "../../_components/RewardForm";
import { RewardFormData, RewardCategory } from "@/domain/entities/rewardFormSchema";
import { Reward } from "@/domain/entities/reward";
import { Box, Typography, CircularProgress } from "@mui/material";

export default function EditRewardPage() {
  const router = useRouter();
  const params = useParams();
  const rewardId = params.id as string;

  const [reward, setReward] = useState<Reward | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Carregar dados da recompensa
  useEffect(() => {
    const loadReward = async () => {
      try {
        setIsLoadingData(true);

        const response = await fetch(`https://api.mock.com/rewards/${rewardId}`);

        if (!response.ok) {
          throw new Error("Recompensa não encontrada");
        }

        const rewardData = await response.json();
        setReward(rewardData);
      } catch (error) {
        console.error("Erro ao carregar recompensa:", error);
        setError(error instanceof Error ? error.message : "Erro ao carregar dados da recompensa");
      } finally {
        setIsLoadingData(false);
      }
    };

    if (rewardId) {
      loadReward();
    }
  }, [rewardId]);

  const handleSubmit = async (data: RewardFormData) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`https://api.mock.com/rewards/${rewardId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar recompensa");
      }

      setSuccess("Recompensa atualizada com sucesso!");

      setTimeout(() => {
        router.push("/rewards");
      }, 2000);
    } catch (error) {
      console.error("Erro ao atualizar recompensa:", error);
      setError(error instanceof Error ? error.message : "Erro inesperado ao atualizar recompensa");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingData) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="400px"
        gap={2}
      >
        <CircularProgress />
        <Typography variant="body1">Carregando dados da recompensa...</Typography>
      </Box>
    );
  }

  if (error && !reward) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="400px"
      >
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  if (!reward) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="400px"
      >
        <Typography variant="h6">Recompensa não encontrada</Typography>
      </Box>
    );
  }

  const initialData: Partial<RewardFormData> = {
    name: reward.name,
    description: reward.description,
    imageUrl: reward.imageUrl,
    pointsRequired: reward.points,
    category: reward.category as RewardCategory,
    expiresAt: null,
  };

  return (
    <RewardForm
      title="Editar Recompensa"
      submitText="Atualizar Recompensa"
      initialData={initialData}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      error={error}
      success={success}
    />
  );
}
