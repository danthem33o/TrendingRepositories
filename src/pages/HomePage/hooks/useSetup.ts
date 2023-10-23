import { useEffect } from "react";
import { useTrendingRepositoriesQuery } from "../../../queries/useTrendingRepositoriesQuery";
import { useTrendingRepositories } from "../../../state/TrendingRepositories/hooks/useTrendingRepositories";
import { Repository as ApiRepository } from "../../../api/Repositories/types";
import { Repository as StateRepository } from "../../../state/TrendingRepositories/types";
import { useFavouritedRepositoriesQuery } from "../../../queries/useFavouritedRepositoriesQuery";
import { StarredRepository } from "../../../api/Stars/types";
import { useSearchRepositoriesQuery } from "../../../queries/useSearchRepositoriesQuery";

const responseToStateRepository = (
  response: ApiRepository
): StateRepository => {
  return {
    id: response.id,
    name: response.name,
    url: response.html_url,
    description: response.description,
    stars: response.stargazers_count,
    createdAt: response.created_at,
    owner: {
      name: response.owner.login,
    },
  };
};

const starredToQuery = (
  favourited: StarredRepository
): { owner: string; repo: string } => {
  return {
    owner: favourited.ownerName,
    repo: favourited.repoName,
  };
};

export const useSetup = () => {
  const repositoriesQuery = useTrendingRepositoriesQuery();
  const favouritedQuery = useFavouritedRepositoriesQuery();
  const favouritedRepositoriesQuery = useSearchRepositoriesQuery(
    "search-favourited-repositories",
    { repos: favouritedQuery.data?.data.map(starredToQuery) },
    !favouritedQuery.isLoading && favouritedQuery.isSuccess
  );

  const { initialise } = useTrendingRepositories();

  useEffect(() => {
    if (
      !repositoriesQuery.isLoading &&
      repositoriesQuery.isSuccess &&
      !favouritedRepositoriesQuery.isLoading &&
      favouritedRepositoriesQuery.isSuccess
    ) {
      initialise(
        repositoriesQuery.data?.data.items.map(responseToStateRepository) ?? [],
        favouritedRepositoriesQuery.data?.data.items.map(
          responseToStateRepository
        ) ?? []
      );
    }
  }, [
    favouritedQuery.data?.data,
    favouritedQuery.isLoading,
    favouritedQuery.isSuccess,
    favouritedRepositoriesQuery.data?.data.items,
    favouritedRepositoriesQuery.isLoading,
    favouritedRepositoriesQuery.isSuccess,
    initialise,
    repositoriesQuery.data,
    repositoriesQuery.isLoading,
    repositoriesQuery.isSuccess,
  ]);

  return {
    isLoading: repositoriesQuery.isLoading || favouritedQuery.isLoading,
  };
};
