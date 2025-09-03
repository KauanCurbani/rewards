"use client";
import { Reward } from "@/domain/entities/reward";
import Grid from "@mui/material/Grid";
import { RewardCard } from "./RewardCard";
import { RewardSkeleton } from "./RewardSkeleton";

interface RewardsGridProps {
  rewards: Reward[];
  loading: boolean;
}

export function RewardsGrid({ rewards, loading }: RewardsGridProps) {
  return (
    <Grid container columns={12} spacing={2} marginY={2} style={{ flex: 1 }}>
      {loading ? (
        <RewardSkeleton />
      ) : (
        rewards.map((reward) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={reward.id}>
            <RewardCard reward={reward} />
          </Grid>
        ))
      )}
    </Grid>
  );
}
