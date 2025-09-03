import Logo from "@/components/logo";
import { RewardUseCase } from "@/domain/useCases/rewardUseCase";
import { ApiRewardRepository } from "@/infra/api/repositories/apiRewardRepository";
import React from "react";
import "./style.css";
import { Box, Chip, Divider, Tooltip, Typography } from "@mui/material";
import { Metadata } from "next";
import { StarBorderTwoTone } from "@mui/icons-material";

export const metadata: Metadata = {
  title: "Recompensas | Be Sistemas",
  description: "Explore as recompensas disponíveis na nossa plataforma.",
};

export default async function Page() {
  const useCase = new RewardUseCase(new ApiRewardRepository());
  const rewards = await useCase.getRewards();

  return (
    <div className="root__container">
      <div className="header">
        <Logo size={40} />
      </div>

      <Box paddingBlock={2}>
        <Typography variant="h6">Recompensas Disponíveis</Typography>
        <Typography variant="body2" color="textSecondary">
          Explore as recompensas disponíveis na nossa plataforma.
        </Typography>
      </Box>

      <div className="cards__grid">
        {rewards.map((reward) => {
          let dateText: string | null = null;
          if (reward.expiresAt) {
            const daysUntilExpiration = Math.ceil(
              (new Date(reward.expiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
            );
            const validText = new Intl.RelativeTimeFormat("pt-BR", {}).format(
              daysUntilExpiration,
              "days"
            );
            dateText = validText;
          }
          return (
            <div key={reward.id} className="card__container">
              <div className="card__image-container">
                {dateText && (
                  <div className="date__bevel">
                    <Typography variant="caption">Expira {dateText}</Typography>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 100 100"
                      className="bevel-right"
                    >
                      <path d="M0 100A100 100 0 01100 0L0 0V100" fill="#fff" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 100 100"
                      className="bevel-bottom"
                    >
                      <path d="M0 100A100 100 0 01100 0L0 0V100" fill="#fff" />
                    </svg>
                  </div>
                )}
                <img src={reward.imageUrl} alt={reward.name} />
              </div>
              <div className="card__content">
                <Tooltip title={reward.name} placement="top" arrow>
                  <Typography variant="h5" noWrap>
                    {reward.name}
                  </Typography>
                </Tooltip>
                <Typography variant="caption">{reward.description}</Typography>

                <Divider style={{ marginBlock: "16px" }} />

                <div className="card__row">
                  <Chip
                    label={`${reward.points} pontos`}
                    size="small"
                    color="primary"
                    icon={<StarBorderTwoTone fontSize="small" />}
                  />
                  <Chip label={reward.category} size="small" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
