import { PayloadAction } from "../types";
import { Repository } from "./types";

export type TrendingRepositoriesAction = PayloadAction<
  "TRENDING_INIT",
  TrendingRepositoriesState
>;

export interface TrendingRepositoriesState {
  trending: Repository[];
}
