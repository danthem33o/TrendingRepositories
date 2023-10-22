import { useUnstarRepositoryMutation } from "../../../queries/useUnstarRepositoryMutation";
import { useStateContext } from "../../context/StateProvider";

export const useUnfavouriteRepository = (repositoryId: number) => {
  const { dispatch } = useStateContext();

  const mutation = useUnstarRepositoryMutation(() => {
    dispatch({
      type: "UNFAVOURITE",
      payload: { repositoryId },
    });
  });

  return mutation;
};
