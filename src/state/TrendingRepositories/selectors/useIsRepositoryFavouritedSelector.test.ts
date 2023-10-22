import { renderHook } from "@testing-library/react";
import * as StateProvider from "../../context/StateProvider";
import { useIsRepositoryFavouritedSelector } from "./useIsRepositoryFavouritedSelector";
import { trendingRepositoriesInitialState } from "../trendingRepositoriesInitialState";

describe("useIsRepositoryFavouritedSelector", () => {
  const testCases = [
    { expected: [], result: false },
    { expected: [1], result: true },
  ];

  test.each(testCases)(
    "It returns true if the ID exists or false if the ID does not exist",
    (testCase) => {
      // ARRANGE:
      const expected: number[] = testCase.expected;

      jest.spyOn(StateProvider, "useStateContext").mockReturnValue({
        state: {
          ...trendingRepositoriesInitialState,
          favourites: expected,
        },
        dispatch: jest.fn(),
      });

      // ACT:
      const { result } = renderHook(() =>
        useIsRepositoryFavouritedSelector()(1)
      );

      // ASSERT:
      expect(result.current).toBe(testCase.result);
    }
  );
});
