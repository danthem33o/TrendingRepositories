import { useMemo } from "react";
import { useStateContext } from "../../context/StateProvider";

export const useTrendingRepositoriesSelector = () => {
  const { state } = useStateContext();
  return useMemo(() => state.trending, [state.trending]);
};
