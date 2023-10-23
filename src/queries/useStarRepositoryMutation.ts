import { useMutation } from "@tanstack/react-query";
import { LocalStoragApi } from "../api/LocalStorageApi";
import { StarApi } from "../api/Stars/StarApi";
import { useSnackbar } from "notistack";

export const useStarRepositoryMutation = (onSuccess: () => void) => {
  const api = new StarApi(new LocalStoragApi());
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: (request: { ownerName: string; repoName: string }) => {
      return api.starARepository(request.ownerName, request.repoName);
    },
    onSuccess,
    onError: (_) => {
      enqueueSnackbar("Unable to star repository", { variant: "error" });
    },
  });
};
