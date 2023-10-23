import { useStateContext } from "../../context/StateProvider";
import { useStarRepositoryMutation } from "../../../queries/useStarRepositoryMutation";
import { Repository } from "../types";

export const useFavouriteRepository = (repository: Repository) => {
  const { dispatch } = useStateContext();

  const mutation = useStarRepositoryMutation(() => {
    dispatch({
      type: "FAVOURITE",
      payload: { repository },
    });
  });

  return mutation;
};
