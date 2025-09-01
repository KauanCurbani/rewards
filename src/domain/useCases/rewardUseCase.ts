import { Reward } from "../entities/reward";
import { RewardRepository } from "../repository/rewardRepository";

export class RewardUseCase {
  constructor(private rewardRepository: RewardRepository) {}

  async getRewards(): Promise<Reward[]> {
    return await this.rewardRepository.fetchRewards();
  }
}
