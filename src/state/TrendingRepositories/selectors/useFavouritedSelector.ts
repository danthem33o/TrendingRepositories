import { useMemo } from "react";
import { useStateContext } from "../../context/StateProvider";

export const useFavouritedSelector = () => {
  const { state } = useStateContext();
  return useMemo(() => {
    return state.favourites;
  }, [state.favourites]);
};
