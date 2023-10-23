import { useFavouriteRepository } from "../actions/useFavouriteRepository";
import { useFilterByLanguages } from "../actions/useFilterByLanguages";
import { useInitialise } from "../actions/useInitialise";
import { useSetTrendingRepositories } from "../actions/useSetTrendingRepositories";
import { useUnfavouriteRepository } from "../actions/useUnfavouriteRepository";
import { useFavouritedSelector } from "../selectors/useFavouritedSelector";
import { useIsRepositoryFavouritedSelector } from "../selectors/useIsRepositoryFavouritedSelector";
import { useLanguagesSelector } from "../selectors/useLanguagesSelector";
import { useTrendingRepositoriesSelector } from "../selectors/useTrendingRepositoriesSelector";

export const useTrendingRepositories = () => {
  const initialise = useInitialise();
  const filterByLanguages = useFilterByLanguages();
  const setTrending = useSetTrendingRepositories();

  const trending = useTrendingRepositoriesSelector();
  const favourites = useFavouritedSelector();
  const languages = useLanguagesSelector();

  const checkIsFavourited = useIsRepositoryFavouritedSelector();

  return {
    initialise,
    filterByLanguages,
    setTrending,
    useFavouriteRepository,
    useUnfavouriteRepository,
    trending,
    favourites,
    languages,
    checkIsFavourited,
  };
};
