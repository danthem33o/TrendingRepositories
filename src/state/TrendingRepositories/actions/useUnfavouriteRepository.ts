import { useUnstarRepositoryMutation } from "../../../queries/useUnstarRepositoryMutation";
import { useStateContext } from "../../context/StateProvider";
import { Repository } from "../types";

export const useUnfavouriteRepository = (repository: Repository) => {
  const { dispatch } = useStateContext();

  const mutation = useUnstarRepositoryMutation(() => {
    dispatch({
      type: "UNFAVOURITE",
      payload: { repository },
    });
  });

  return mutation;
};
