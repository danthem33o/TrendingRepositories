import { useCallback } from "react";
import { useStateContext } from "../../context/StateProvider";

export const useIsRepositoryFavouritedSelector = () => {
  const { state } = useStateContext();

  return useCallback(
    (id: number) => {
      return !!~state.favourites.findIndex((s) => s.id === id);
    },
    [state.favourites]
  );
};
