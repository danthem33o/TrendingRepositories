import { useQuery } from "@tanstack/react-query";
import { SearchRepositoriesApi } from "../api/Repositories/SearchRepositoriesApi";
import { Api } from "../api/Api";

export const useTrendingRepositoriesQuery = () => {
  const api = new SearchRepositoriesApi(new Api());

  return useQuery({
    queryKey: ["trending-repositories"],
    queryFn: async () => await api.getTrendingRepositories(),
  });
};
