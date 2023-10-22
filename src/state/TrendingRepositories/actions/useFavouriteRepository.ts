import { useCallback } from "react";
import { useStateContext } from "../../context/StateProvider";

export const useFavouriteRepository = () => {
  const { dispatch } = useStateContext();

  return useCallback(
    (repositoryId: number) => {
      dispatch({
        type: "FAVOURITE",
        payload: { repositoryId },
      });
    },
    [dispatch]
  );
};
