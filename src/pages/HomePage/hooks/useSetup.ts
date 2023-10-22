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

export const useSetup = () => {
  const query = useTrendingRepositoriesQuery();
  const { initialise } = useTrendingRepositories();

  useEffect(() => {
    if (!query.isLoading && query.isSuccess) {
      initialise(query.data.data.items.map(responseToStateRepository));
    }
  }, [initialise, query.data, query.isLoading, query.isSuccess]);

  return query;
};
