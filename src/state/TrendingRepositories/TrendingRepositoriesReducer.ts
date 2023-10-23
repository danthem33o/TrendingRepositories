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
    case "UNFAVOURITE": {
      const { repositoryId } = action.payload;

      const index = state.favourites.indexOf(repositoryId);

      if (!~index) {
        return state;
      }

      const favourites = Array.from(state.favourites);
      favourites.splice(index, 1);

      return {
        ...state,
        favourites,
      };
    }
    case "FILTER_BY_LANGUAGES": {
      const { languages } = action.payload;

      return {
        ...state,
        languages,
      };
    }
    case "SET_TRENDING": {
      const { trending } = action.payload;

      return {
        ...state,
        trending,
      };
    }
    default:
      return state;
  }
};
