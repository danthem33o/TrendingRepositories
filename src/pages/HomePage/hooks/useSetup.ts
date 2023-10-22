import { useEffect } from "react";
import { useTrendingRepositoriesQuery } from "../../../queries/useTrendingRepositoriesQuery";
import { useTrendingRepositories } from "../../../state/TrendingRepositories/hooks/useTrendingRepositories";
import { Repository as ApiRepository } from "../../../api/Repositories/types";
import { Repository as StateRepository } from "../../../state/TrendingRepositories/types";
import { useFavouritedRepositoriesQuery } from "../../../queries/useFavouritedRepositoriesQuery";
import { StarredRepository } from "../../../api/Stars/types";

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

const responseToFavourited =
  (repositories: ApiRepository[]) =>
  (favourited: StarredRepository): number => {
    return (
      repositories.find(
        (s) =>
          s.owner.login === favourited.ownerName &&
          s.name === favourited.repoName
      )?.id ?? 0
    );
  };

export const useSetup = () => {
  const repositoriesQuery = useTrendingRepositoriesQuery();
  const favouritedQuery = useFavouritedRepositoriesQuery();

  const { initialise } = useTrendingRepositories();

  useEffect(() => {
    if (
      !repositoriesQuery.isLoading &&
      repositoriesQuery.isSuccess &&
      !favouritedQuery.isLoading &&
      favouritedQuery.isSuccess
    ) {
      const mapFavourites = responseToFavourited(
        repositoriesQuery.data?.data.items ?? []
      );

      initialise(
        repositoriesQuery.data?.data.items.map(responseToStateRepository) ?? [],
        favouritedQuery.data?.data.map(mapFavourites) ?? []
      );
    }
  }, [
    favouritedQuery.data?.data,
    favouritedQuery.isLoading,
    favouritedQuery.isSuccess,
    initialise,
    repositoriesQuery.data,
    repositoriesQuery.isLoading,
    repositoriesQuery.isSuccess,
  ]);

  return {
    isLoading: repositoriesQuery.isLoading || favouritedQuery.isLoading,
  };
};
