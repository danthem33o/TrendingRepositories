import { useInitialise } from "../actions/useInitialise";
import { useTrendingRepositoriesSelector } from "../selectors/useTrendingRepositoriesSelector";

export const useTrendingRepositories = () => {
  const initialise = useInitialise();
  const trending = useTrendingRepositoriesSelector();

  return { initialise, trending };
};
