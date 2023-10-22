import { useFavouriteRepository } from "../actions/useFavouriteRepository";
import { useInitialise } from "../actions/useInitialise";
import { useIsRepositoryFavouritedSelector } from "../selectors/useIsRepositoryFavouritedSelector";
import { useTrendingRepositoriesSelector } from "../selectors/useTrendingRepositoriesSelector";

export const useTrendingRepositories = () => {
  const initialise = useInitialise();
  const favouriteRepository = useFavouriteRepository();

  const trending = useTrendingRepositoriesSelector();
  const checkIsFavourited = useIsRepositoryFavouritedSelector();

  return { initialise, favouriteRepository, trending, checkIsFavourited };
};
