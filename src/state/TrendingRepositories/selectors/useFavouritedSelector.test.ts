import { renderHook } from "@testing-library/react";
import * as StateProvider from "../../context/StateProvider";
import { useFavouritedSelector } from "./useFavouritedSelector";
import { Repository } from "../types";
import { trendingRepositoriesInitialState } from "../trendingRepositoriesInitialState";

describe("useFavouritedSelector", () => {
  test("Returns favourited repositories", () => {
    // ARRANGE:
    const expected: Repository[] = [
      {
        id: 1,
        name: "1",
        url: "https://example.com",
        description: "1",
        stars: 1,
        createdAt: "1",
        owner: {
          name: "Owner 1",
        },
      },
    ];

    jest.spyOn(StateProvider, "useStateContext").mockReturnValue({
      state: {
        ...trendingRepositoriesInitialState,
        trending: [
          ...expected,
          {
            id: 2,
            name: "2",
            url: "https://example.com",
            description: "2",
            stars: 2,
            createdAt: "2",
            owner: {
              name: "Owner 2",
            },
          },
        ],
        favourites: expected,
      },
      dispatch: jest.fn(),
    });

    // ACT:
    const { result } = renderHook(() => useFavouritedSelector());

    // ASSERT:
    expect(result.current).toEqual(expected);
  });
});
