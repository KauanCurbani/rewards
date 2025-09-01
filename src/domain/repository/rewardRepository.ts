import { Reward } from "../entities/reward";

export interface RewardRepository {
  fetchRewards(): Promise<Reward[]>;
}
