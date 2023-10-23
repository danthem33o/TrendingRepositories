import { PayloadAction } from "../types";
import { Repository } from "./types";

export type TrendingRepositoriesAction =
  | PayloadAction<"TRENDING_INIT", TrendingRepositoriesState>
  | PayloadAction<"FAVOURITE", { repository: Repository }>
  | PayloadAction<"UNFAVOURITE", { repository: Repository }>
  | PayloadAction<"FILTER_BY_LANGUAGES", { languages: string[] }>
  | PayloadAction<"SET_TRENDING", { trending: Repository[] }>;

export interface TrendingRepositoriesState {
  trending: Repository[];
  favourites: Repository[];
  languages: string[];
}
