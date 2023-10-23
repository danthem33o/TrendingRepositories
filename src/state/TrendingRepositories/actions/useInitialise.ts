import { useCallback } from "react";
import { useStateContext } from "../../context/StateProvider";
import { Repository } from "../types";
import { trendingRepositoriesInitialState } from "../trendingRepositoriesInitialState";

export const useInitialise = () => {
  const { dispatch } = useStateContext();
  return useCallback(
    (trending: Repository[], favourites: Repository[]) => {
      dispatch({
        type: "TRENDING_INIT",
        payload: {
          ...trendingRepositoriesInitialState,
          trending,
          favourites,
        },
      });
    },
    [dispatch]
  );
};
