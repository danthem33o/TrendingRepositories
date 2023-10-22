import { useMutation } from "@tanstack/react-query";
import { LocalStoragApi } from "../api/LocalStorageApi";
import { StarApi } from "../api/Stars/StarApi";

export const useStarRepositoryMutation = (onSuccess: () => void) => {
  const api = new StarApi(new LocalStoragApi());

  return useMutation({
    mutationFn: (request: { ownerName: string; repoName: string }) => {
      return api.starARepository(request.ownerName, request.repoName);
    },
    onSuccess,
  });
};
