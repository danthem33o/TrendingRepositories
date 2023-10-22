import { useStateContext } from "../../context/StateProvider";
import { useStarRepositoryMutation } from "../../../queries/useStarRepositoryMutation";

export const useFavouriteRepository = (repositoryId: number) => {
  const { dispatch } = useStateContext();

  const mutation = useStarRepositoryMutation(() => {
    dispatch({
      type: "FAVOURITE",
      payload: { repositoryId },
    });
  });

  return mutation;
};
