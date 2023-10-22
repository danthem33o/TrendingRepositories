import { useFavouriteRepository } from "../actions/useFavouriteRepository";
import { useInitialise } from "../actions/useInitialise";
import { useIsRepositoryFavouritedSelector } from "../selectors/useIsRepositoryFavouritedSelector";
import { useTrendingRepositoriesSelector } from "../selectors/useTrendingRepositoriesSelector";

export const useTrendingRepositories = () => {
  const initialise = useInitialise();

  const trending = useTrendingRepositoriesSelector();
  const checkIsFavourited = useIsRepositoryFavouritedSelector();

  return { initialise, useFavouriteRepository, trending, checkIsFavourited };
};
