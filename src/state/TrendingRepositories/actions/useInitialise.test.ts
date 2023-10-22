import { renderHook } from "@testing-library/react";
import * as StateProvider from "../../context/StateProvider";
import { useInitialise } from "./useInitialise";
import { trendingRepositoriesInitialState } from "../trendingRepositoriesInitialState";

describe("useInitialise", () => {
  test("first action with expected payload", () => {
    // ARRANGE:
    const mockDispatch = jest.fn();
    jest.spyOn(StateProvider, "useStateContext").mockReturnValue({
      state: {
        ...trendingRepositoriesInitialState,
        trending: [],
      },
      dispatch: mockDispatch,
    });

    const expected = [
      {
        id: 1,
        name: "1",
        url: "https://example.com",
        description: "1",
        stars: 1,
        createdAt: "1",
        owner: {
          name: "Owner",
        },
      },
    ];

    // ACT:
    renderHook(() => useInitialise()(expected, [1]));

    // ASSERT:
    expect(mockDispatch).toBeCalledTimes(1);
    expect(mockDispatch).toBeCalledWith({
      type: "TRENDING_INIT",
      payload: { trending: expected, favourites: [1] },
    });
  });
});
