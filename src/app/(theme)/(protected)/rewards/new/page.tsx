"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { RewardForm } from "../_components/RewardForm";
import { RewardFormData } from "@/domain/entities/rewardFormSchema";

export default function NewRewardPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (data: RewardFormData) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // TODO: Implementar chamada da API para criar recompensa
      const response = await fetch("https://api.mock.com/rewards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar recompensa");
      }

      setSuccess("Recompensa criada com sucesso!");

      // Redirecionar após 2 segundos
      setTimeout(() => {
        router.push("/rewards");
      }, 2000);
    } catch (error) {
      console.error("Erro ao criar recompensa:", error);
      setError(error instanceof Error ? error.message : "Erro inesperado ao criar recompensa");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <RewardForm
      title="Nova Recompensa"
      submitText="Criar Recompensa"
      onSubmit={handleSubmit}
      isLoading={isLoading}
      error={error}
      success={success}
    />
  );
}
