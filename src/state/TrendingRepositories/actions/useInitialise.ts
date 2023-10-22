import { useCallback } from "react";
import { useStateContext } from "../../context/StateProvider";
import { Repository } from "../types";

export const useInitialise = () => {
  const { dispatch } = useStateContext();
  return useCallback(
    (trending: Repository[]) => {
      dispatch({
        type: "TRENDING_INIT",
        payload: {
          trending,
        },
      });
    },
    [dispatch]
  );
};
