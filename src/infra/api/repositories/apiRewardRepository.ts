import { Reward } from "@/domain/entities/reward";
import { RewardRepository } from "@/domain/repository/rewardRepository";
import { api } from "../lib/api";

export class ApiRewardRepository implements RewardRepository {
  async fetchRewards(): Promise<Reward[]> {
    const response = await api.get("https://api.mock.com/rewards");
    return response.data;
  }
}
