import { useMemo } from "react";
import { useStateContext } from "../../context/StateProvider";

export const useFavouritedSelector = () => {
  const { state } = useStateContext();
  return useMemo(() => {
    const favouritedIds = state.favourites;
    return state.trending
      .filter((s) => favouritedIds.includes(s.id))
      .map((s) => s);
  }, [state.favourites, state.trending]);
};
