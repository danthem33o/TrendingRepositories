import { PayloadAction } from "../types";
import { Repository } from "./types";

export type TrendingRepositoriesAction =
  | PayloadAction<"TRENDING_INIT", TrendingRepositoriesState>
  | PayloadAction<"FAVOURITE", { repositoryId: number }>
  | PayloadAction<"UNFAVOURITE", { repositoryId: number }>
  | PayloadAction<"FILTER_BY_LANGUAGES", { languages: string[] }>
  | PayloadAction<"SET_TRENDING", { trending: Repository[] }>;

export interface TrendingRepositoriesState {
  trending: Repository[];
  favourites: number[];
  languages: string[];
}
