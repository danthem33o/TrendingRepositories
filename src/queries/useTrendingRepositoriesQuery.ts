import { useQuery } from "@tanstack/react-query";
import { SearchRepositoriesApi } from "../api/Repositories/SearchRepositoriesApi";
import { Api } from "../api/Api";

export const useTrendingRepositoriesQuery = (languages?: string[]) => {
  const api = new SearchRepositoriesApi(new Api());

  return useQuery({
    queryKey: ["trending-repositories", languages],
    queryFn: async () =>
      await api.getTrendingRepositories(undefined, languages),
  });
};
