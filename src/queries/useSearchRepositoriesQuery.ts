import { useQuery } from "@tanstack/react-query";
import { Api } from "../api/Api";
import { SearchRepositoriesApi } from "../api/Repositories/SearchRepositoriesApi";
import { SearchRepositoryConfig } from "../api/Repositories/types";
import { useMemo } from "react";
import { Qualifiers } from "../api/Repositories/Qualifiers";

export const useSearchRepositoriesQuery = (
  queryId: string,
  config?: SearchRepositoryConfig,
  enabled?: boolean
) => {
  const api = new SearchRepositoriesApi(new Api());

  const qualifiers = useMemo(() => {
    const builder = new Qualifiers();
    config?.languages?.forEach((s) => builder.language(s));
    config?.repos?.forEach((s) => builder.repo(s.owner, s.repo));

    return builder.build();
  }, [config?.languages, config?.repos]);

  return useQuery({
    queryKey: [queryId, config],
    queryFn: async () => await api.get({ qualifiers }),
    enabled,
  });
};
