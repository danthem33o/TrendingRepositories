import { renderHook } from "@testing-library/react";
import { useTrendingRepositoriesSelector } from "./useTrendingRepositoriesSelector";
import { Repository } from "../types";
import * as StateProvider from "../../context/StateProvider";
import { trendingRepositoriesInitialState } from "../trendingRepositoriesInitialState";

describe("useTrendingRepositoriesSelector", () => {
  test("Returns trending repositories", () => {
    // ARRANGE:
    const expected: Repository[] = [
      {
        id: 1,
        name: "1",
        url: "https://example.com",
        description: "1",
        stars: 1,
        createdAt: "1",
      },
      {
        id: 2,
        name: "2",
        url: "https://example.com",
        description: "2",
        stars: 2,
        createdAt: "2",
      },
    ];

    jest.spyOn(StateProvider, "useStateContext").mockReturnValue({
      state: {
        ...trendingRepositoriesInitialState,
        trending: expected,
      },
      dispatch: jest.fn(),
    });

    // ACT:
    const { result } = renderHook(() => useTrendingRepositoriesSelector());

    // ASSERT:
    expect(result.current).toBe(expected);
  });
});
