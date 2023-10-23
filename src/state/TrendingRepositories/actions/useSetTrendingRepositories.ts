import { useCallback } from "react";
import { useStateContext } from "../../context/StateProvider";
import { Repository } from "../types";

export const useSetTrendingRepositories = () => {
  const { dispatch } = useStateContext();

  return useCallback(
    (trending: Repository[]) => {
      dispatch({
        type: "SET_TRENDING",
        payload: { trending },
      });
    },
    [dispatch]
  );
};
