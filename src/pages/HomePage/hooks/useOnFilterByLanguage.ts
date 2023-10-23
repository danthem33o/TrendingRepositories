import { useEffect } from "react";
import { useTrendingRepositoriesQuery } from "../../../queries/useTrendingRepositoriesQuery";
import { useTrendingRepositories } from "../../../state/TrendingRepositories/hooks/useTrendingRepositories";
import { Repository as ApiRepository } from "../../../api/Repositories/types";
import { Repository as StateRepository } from "../../../state/TrendingRepositories/types";

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

export const useOnFilterByLanguage = () => {
  const { languages, setTrending } = useTrendingRepositories();
  const repositoriesQuery = useTrendingRepositoriesQuery(languages);

  useEffect(() => {
    if (!repositoriesQuery.isLoading && repositoriesQuery.isSuccess) {
      setTrending(
        repositoriesQuery.data?.data.items.map(responseToStateRepository) ?? []
      );
    }
  }, [
    repositoriesQuery.data?.data.items,
    repositoriesQuery.isLoading,
    repositoriesQuery.isSuccess,
    setTrending,
  ]);

  return {
    isLoading: repositoriesQuery.isLoading,
  };
};
