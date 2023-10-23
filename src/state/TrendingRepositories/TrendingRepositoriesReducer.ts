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
      const { repository } = action.payload;

      if (~state.favourites.findIndex((s) => s.id === repository.id)) {
        return state;
      }

      const favourites = Array.from(state.favourites);
      favourites.push(action.payload.repository);

      return {
        ...state,
        favourites,
      };
    }
    case "UNFAVOURITE": {
      const { repository } = action.payload;

      const index = state.favourites.findIndex((s) => s.id === repository.id);

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
