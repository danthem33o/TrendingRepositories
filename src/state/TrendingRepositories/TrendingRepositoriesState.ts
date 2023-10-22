import { PayloadAction } from "../types";
import { Repository } from "./types";

export type TrendingRepositoriesAction =
  | PayloadAction<"TRENDING_INIT", TrendingRepositoriesState>
  | PayloadAction<"FAVOURITE", { repositoryId: number }>;

export interface TrendingRepositoriesState {
  trending: Repository[];
  favourites: number[];
}
