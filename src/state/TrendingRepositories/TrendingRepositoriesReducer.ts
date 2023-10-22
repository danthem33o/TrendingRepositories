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
    case "FAVOURITE": {
      const { repositoryId } = action.payload;

      if (~state.favourites.indexOf(repositoryId)) {
        return state;
      }

      const favourites = Array.from(state.favourites);
      favourites.push(action.payload.repositoryId);

      return {
        ...state,
        favourites,
      };
    }
    default:
      return state;
  }
};
