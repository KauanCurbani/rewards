"use client";
import { Reward } from "@/domain/entities/reward";
import { RewardUseCase } from "@/domain/useCases/rewardUseCase";
import { ApiRewardRepository } from "@/infra/api/repositories/apiRewardRepository";
import { RewardFilters } from "@/domain/entities/rewardFilters";
import { Box, Typography, Stack, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState, useMemo } from "react";
import { RewardsFilter, FilterState } from "./_components/RewardsFilter";
import { RewardsFilterSkeleton } from "./_components/RewardsFilterSkeleton";
import { RewardsGrid } from "./_components/RewardsGrid";

export default function Home() {
  const router = useRouter();
  const useCase = new RewardUseCase(new ApiRewardRepository());
  const [allRewards, setAllRewards] = useState<Reward[]>([]);
  const [filteredRewards, setFilteredRewards] = useState<Reward[]>([]);
  const [loading, setLoading] = useState(true);
  const [uniqueCategories, setUniqueCategories] = useState<string[]>([]);
  const [maxPoints, setMaxPoints] = useState(50);

  const [filters, setFilters] = useState<RewardFilters>({
    searchTerm: "",
    minPoints: 0,
    maxPoints: 50,
    category: "all",
    sortBy: "name-asc",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const rewards = await useCase.getRewards();

        setAllRewards(rewards);
        setFilteredRewards(rewards);

        const categories = useCase.extractUniqueCategories(rewards);
        const maxPts = useCase.getMaxPointsFromRewards(rewards);

        setUniqueCategories(categories);
        setMaxPoints(maxPts);
        setFilters((prev) => ({ ...prev, maxPoints: maxPts }));
      } catch (error) {
        console.error("Error fetching rewards:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (allRewards.length > 0) {
      const filtered = useCase.applyFiltersToRewards(allRewards, filters);
      setFilteredRewards(filtered);
    }
  }, [filters, allRewards]);

  const handleApplyFilters = (newFilters: FilterState) => {
    setFilters({
      searchTerm: newFilters.searchTerm,
      minPoints: newFilters.minPoints,
      maxPoints: newFilters.maxPoints,
      category: newFilters.category,
      sortBy: newFilters.sortBy as RewardFilters["sortBy"],
    });
  };

  return (
    <div style={{ overflowX: "hidden" }}>
      <Image
        src="/bg.webp"
        alt="background"
        width={1920}
        height={1080}
        style={{
          width: "100%",
          height: "50vh",
          objectFit: "cover",
        }}
      />
      <Box
        paddingInline={{ xs: 2, sm: 4, md: "auto" }}
        maxWidth={{ md: 1200 }}
        marginInline={{ md: "auto" }}
        paddingBlock={2}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography
            color="primary"
            fontWeight={600}
            fontSize={{ xs: "h6.fontSize", sm: "h5.fontSize", md: "h4.fontSize" }}
          >
            RECOMPENSAS_
          </Typography>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => router.push("/rewards/new")}
            sx={{
              minWidth: { xs: "auto", sm: "200px" },
              px: { xs: 2, sm: 3 },
            }}
          >
            <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
              Nova Recompensa
            </Box>
          </Button>
        </Stack>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mt: 2 }}>
          {loading ? (
            <RewardsFilterSkeleton />
          ) : (
            <RewardsFilter
              maxPoints={maxPoints}
              categories={uniqueCategories}
              onApplyFilters={handleApplyFilters}
            />
          )}
          <RewardsGrid rewards={filteredRewards} loading={loading} />
        </Stack>
      </Box>
    </div>
  );
}
