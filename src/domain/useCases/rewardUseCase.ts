import { Reward } from "../entities/reward";
import { RewardRepository } from "../repository/rewardRepository";
import { RewardFilters } from "../entities/rewardFilters";

export class RewardUseCase {
  constructor(private rewardRepository: RewardRepository) {}

  async getRewards(filters?: RewardFilters): Promise<Reward[]> {
    const rewards = await this.rewardRepository.fetchRewards();
    if (!filters) return rewards;

    return this.applyFiltersAndSort(rewards, filters);
  }

  async getUniqueCategories(): Promise<string[]> {
    const rewards = await this.rewardRepository.fetchRewards();
    return this.extractUniqueCategories(rewards);
  }

  async getMaxPoints(): Promise<number> {
    const rewards = await this.rewardRepository.fetchRewards();
    return this.getMaxPointsFromRewards(rewards);
  }

  // Métodos públicos para evitar múltiplas chamadas à API
  extractUniqueCategories(rewards: Reward[]): string[] {
    const categories = rewards.reduce((acc: string[], reward) => {
      if (reward.category && !acc.includes(reward.category)) {
        acc.push(reward.category);
      }
      return acc;
    }, []);

    return categories.sort();
  }

  getMaxPointsFromRewards(rewards: Reward[]): number {
    return Math.max(...rewards.map((reward) => reward.points), 0);
  }

  applyFiltersToRewards(rewards: Reward[], filters: RewardFilters): Reward[] {
    return this.applyFiltersAndSort(rewards, filters);
  }

  private applyFiltersAndSort(rewards: Reward[], filters: RewardFilters): Reward[] {
    let filteredRewards = rewards;

    if (filters.searchTerm) {
      filteredRewards = this.filterBySearchTerm(filteredRewards, filters.searchTerm);
    }

    if (filters.category && filters.category !== "all") {
      filteredRewards = this.filterByCategory(filteredRewards, filters.category);
    }

    if (filters.minPoints !== undefined || filters.maxPoints !== undefined) {
      filteredRewards = this.filterByPointsRange(
        filteredRewards,
        filters.minPoints || 0,
        filters.maxPoints || Number.MAX_SAFE_INTEGER
      );
    }

    if (filters.sortBy) {
      filteredRewards = this.sortRewards(filteredRewards, filters.sortBy);
    }

    return filteredRewards;
  }

  private filterBySearchTerm(rewards: Reward[], searchTerm: string): Reward[] {
    const normalizedSearch = searchTerm.toLowerCase().trim();
    if (!normalizedSearch) return rewards;

    return rewards.filter(
      (reward) =>
        reward.name.toLowerCase().includes(normalizedSearch) ||
        reward.description.toLowerCase().includes(normalizedSearch)
    );
  }

  private filterByCategory(rewards: Reward[], category: string): Reward[] {
    return rewards.filter((reward) => reward.category === category);
  }

  private filterByPointsRange(rewards: Reward[], minPoints: number, maxPoints: number): Reward[] {
    return rewards.filter((reward) => reward.points >= minPoints && reward.points <= maxPoints);
  }

  private sortRewards(rewards: Reward[], sortBy: string): Reward[] {
    const sortedRewards = [...rewards];

    switch (sortBy) {
      case "name-asc":
        return sortedRewards.sort((a, b) => a.name.localeCompare(b.name));

      case "name-desc":
        return sortedRewards.sort((a, b) => b.name.localeCompare(a.name));

      case "points-asc":
        return sortedRewards.sort((a, b) => a.points - b.points);

      case "points-desc":
        return sortedRewards.sort((a, b) => b.points - a.points);

      case "newest":
        return sortedRewards.sort((a, b) => Number(b.id) - Number(a.id));

      case "popular":
        return sortedRewards.sort((a, b) => b.points - a.points);

      default:
        return sortedRewards;
    }
  }
}
