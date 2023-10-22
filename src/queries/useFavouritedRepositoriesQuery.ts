import { useQuery } from "@tanstack/react-query";
import { StarApi } from "../api/Stars/StarApi";
import { LocalStoragApi } from "../api/LocalStorageApi";

export const useFavouritedRepositoriesQuery = () => {
  const api = new StarApi(new LocalStoragApi());

  return useQuery({
    queryKey: ["favourited-repositories"],
    queryFn: async () => await api.get(),
  });
};
