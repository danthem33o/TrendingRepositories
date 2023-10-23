import { useCallback } from "react";
import { useStateContext } from "../../context/StateProvider";

export const useFilterByLanguages = () => {
  const { dispatch } = useStateContext();

  return useCallback(
    (languages: string[]) => {
      dispatch({
        type: "FILTER_BY_LANGUAGES",
        payload: { languages },
      });
    },
    [dispatch]
  );
};
