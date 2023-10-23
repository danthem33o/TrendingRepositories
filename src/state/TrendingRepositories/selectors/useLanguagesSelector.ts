import { useMemo } from "react";
import { useStateContext } from "../../context/StateProvider";

export const useLanguagesSelector = () => {
  const { state } = useStateContext();
  return useMemo(() => state.languages, [state.languages]);
};
