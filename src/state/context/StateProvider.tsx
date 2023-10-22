import {
  PropsWithChildren,
  createContext,
  useMemo,
  useReducer,
  Dispatch,
  useContext,
} from "react";
import {
  TrendingRepositoriesAction,
  TrendingRepositoriesState,
} from "../TrendingRepositories/TrendingRepositoriesState";
import { TrendingRepositoriesReducer } from "../TrendingRepositories/TrendingRepositoriesReducer";
import { trendingRepositoriesInitialState } from "../TrendingRepositories/trendingRepositoriesInitialState";

const StateContext = createContext<
  | {
      state: TrendingRepositoriesState;
      dispatch: Dispatch<TrendingRepositoriesAction>;
    }
  | undefined
>(undefined);

export interface StateProviderProps {
  initialState?: TrendingRepositoriesState;
}

export const StateProvider = ({
  children,
  initialState,
}: PropsWithChildren<StateProviderProps>) => {
  const [state, dispatch] = useReducer(
    TrendingRepositoriesReducer,
    initialState ?? trendingRepositoriesInitialState
  );

  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
};

export const useStateContext = () => {
  const context = useContext(StateContext);

  if (!context) {
    throw new Error(
      `Context could not be retrieved. Please ensure that useStateContext is used within a StateProvider.`
    );
  }

  return context;
};
