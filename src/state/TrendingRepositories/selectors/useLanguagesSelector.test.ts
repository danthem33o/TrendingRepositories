import { renderHook } from "@testing-library/react";
import * as StateProvider from "../../context/StateProvider";
import { useLanguagesSelector } from "./useLanguagesSelector";
import { trendingRepositoriesInitialState } from "../trendingRepositoriesInitialState";

describe("useLanguagesSelector", () => {
  it("Returns list of languages", () => {
    // ARRANGE:
    const expected: string[] = ["JavaScript", "TypeScript", "C#"];

    jest.spyOn(StateProvider, "useStateContext").mockReturnValue({
      state: {
        ...trendingRepositoriesInitialState,
        languages: expected,
      },
      dispatch: jest.fn(),
    });

    // ACT:
    const { result } = renderHook(() => useLanguagesSelector());

    // ASSERT:
    expect(result.current).toBe(expected);
  });
});
