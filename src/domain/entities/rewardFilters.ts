export interface RewardFilters {
  searchTerm?: string;
  minPoints?: number;
  maxPoints?: number;
  category?: string;
  sortBy?: "name-asc" | "name-desc" | "points-asc" | "points-desc" | "newest" | "popular";
}
