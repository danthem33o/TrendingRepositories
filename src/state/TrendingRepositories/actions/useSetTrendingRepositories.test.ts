import { renderHook } from "@testing-library/react";
import * as StateProvider from "../../context/StateProvider";
import { trendingRepositoriesInitialState } from "../trendingRepositoriesInitialState";
import { useSetTrendingRepositories } from "./useSetTrendingRepositories";

describe("useSetTrendingRepositories", () => {
  test("It fires the action with the given payload", () => {
    // ARRANGE:
    const mockDispatch = jest.fn();
    jest.spyOn(StateProvider, "useStateContext").mockReturnValue({
      state: {
        ...trendingRepositoriesInitialState,
        trending: [],
        favourites: [],
      },
      dispatch: mockDispatch,
    });

    // ACT:
    renderHook(() => useSetTrendingRepositories()([]));

    // ASSERT:
    expect(mockDispatch).toBeCalledTimes(1);
    expect(mockDispatch).toBeCalledWith({
      type: "SET_TRENDING",
      payload: { trending: [] },
    });
  });
});
