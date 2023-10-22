import { useQuery } from "@tanstack/react-query";
import { SearchRepositoriesApi } from "../api/Repositories/SearchRepositoriesApi";

export const useTrendingRepositoriesQuery = () => {
  const api = new SearchRepositoriesApi();

  return useQuery({
    queryKey: ["trending-repositories"],
    queryFn: async () => await api.getTrendingRepositories(),
  });
};
