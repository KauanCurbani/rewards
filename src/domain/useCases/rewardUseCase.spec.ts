import { RewardUseCase } from "./rewardUseCase";
import type { RewardRepository } from "@/domain/repository/rewardRepository";
import { Reward } from "@/domain/entities/reward";
import type { RewardFilters } from "@/domain/entities/rewardFilters";

describe("RewardUseCase", () => {
  const makeReward = (overrides: Partial<Reward> = {}): Reward =>
    new Reward({
      id: overrides.id ?? "1",
      name: overrides.name ?? "Gift Card",
      description: overrides.description ?? "Amazon gift card",
      imageUrl: overrides.imageUrl ?? "https://img",
      points: overrides.points ?? 100,
      category: overrides.category ?? "shopping",
      expiresAt: overrides.expiresAt ?? null,
    });

  const makeRepo = (rewards: Reward[] = []) =>
    ({
      fetchRewards: jest.fn().mockResolvedValue(rewards),
    } as unknown as RewardRepository);

  test("getRewards returns all when no filters", async () => {
    const rewards = [makeReward({ id: "1" }), makeReward({ id: "2" })];
    const repo = makeRepo(rewards);
    const sut = new RewardUseCase(repo);

    const result = await sut.getRewards();

    expect(result).toEqual(rewards);
  });

  test("getRewards filters by searchTerm in name or description", async () => {
    const rewards = [
      makeReward({ id: "1", name: "Coffee Mug", description: "Ceramic mug" }),
      makeReward({ id: "2", name: "T-Shirt", description: "Cotton shirt" }),
    ];
    const repo = makeRepo(rewards);
    const sut = new RewardUseCase(repo);
    const filters: RewardFilters = { searchTerm: "shirt" };

    const result = await sut.getRewards(filters);

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("T-Shirt");
  });

  test('getRewards filters by category, ignoring "all"', async () => {
    const rewards = [
      makeReward({ id: "1", category: "food" }),
      makeReward({ id: "2", category: "shopping" }),
    ];
    const sut = new RewardUseCase(makeRepo(rewards));

    await expect(sut.getRewards({ category: "all" })).resolves.toHaveLength(2);
    await expect(sut.getRewards({ category: "food" })).resolves.toEqual([rewards[0]]);
  });

  test("getRewards filters by points range with defaults", async () => {
    const rewards = [
      makeReward({ id: "1", points: 50 }),
      makeReward({ id: "2", points: 150 }),
      makeReward({ id: "3", points: 300 }),
    ];
    const sut = new RewardUseCase(makeRepo(rewards));

    await expect(sut.getRewards({ minPoints: 100, maxPoints: 250 })).resolves.toEqual([rewards[1]]);
    await expect(sut.getRewards({ minPoints: 200 })).resolves.toEqual([rewards[2]]);
    await expect(sut.getRewards({ maxPoints: 100 })).resolves.toEqual([rewards[0]]);
  });

  test("getRewards sorts correctly", async () => {
    const rewards = [
      makeReward({ id: "10", name: "B", points: 200 }),
      makeReward({ id: "2", name: "A", points: 100 }),
    ];
    const sut = new RewardUseCase(makeRepo(rewards));

    await expect(sut.getRewards({ sortBy: "name-asc" })).resolves.toEqual([rewards[1], rewards[0]]);
    await expect(sut.getRewards({ sortBy: "name-desc" })).resolves.toEqual([
      rewards[0],
      rewards[1],
    ]);
    await expect(sut.getRewards({ sortBy: "points-asc" })).resolves.toEqual([
      rewards[1],
      rewards[0],
    ]);
    await expect(sut.getRewards({ sortBy: "points-desc" })).resolves.toEqual([
      rewards[0],
      rewards[1],
    ]);
    await expect(sut.getRewards({ sortBy: "newest" })).resolves.toEqual([rewards[0], rewards[1]]);
    await expect(sut.getRewards({ sortBy: "popular" })).resolves.toEqual([rewards[0], rewards[1]]);
  });

  test("getUniqueCategories returns sorted unique categories", async () => {
    const rewards = [
      makeReward({ category: "shopping" }),
      makeReward({ category: "food" }),
      makeReward({ category: "shopping" }),
    ];
    const sut = new RewardUseCase(makeRepo(rewards));

    await expect(sut.getUniqueCategories()).resolves.toEqual(["food", "shopping"]);
  });

  test("getMaxPoints returns 0 for empty list and max otherwise", async () => {
    const sutEmpty = new RewardUseCase(makeRepo([]));
    await expect(sutEmpty.getMaxPoints()).resolves.toBe(0);

    const sut = new RewardUseCase(
      makeRepo([makeReward({ points: 10 }), makeReward({ points: 30 })])
    );
    await expect(sut.getMaxPoints()).resolves.toBe(30);
  });

  test("applyFiltersToRewards delegates correctly", () => {
    const rewards = [makeReward({ name: "Alpha" }), makeReward({ name: "Beta" })];
    const sut = new RewardUseCase(makeRepo(rewards));
    const result = sut.applyFiltersToRewards(rewards, { searchTerm: "alpha" });
    expect(result.map((r) => r.name)).toEqual(["Alpha"]);
  });
});
