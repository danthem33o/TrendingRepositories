import {
  TrendingRepositoriesAction,
  TrendingRepositoriesState,
} from "./TrendingRepositoriesState";

export const TrendingRepositoriesReducer = (
  state: TrendingRepositoriesState,
  action: TrendingRepositoriesAction
) => {
  switch (action.type) {
    case "TRENDING_INIT": {
      return action.payload;
    }
    default:
      return state;
  }
};
