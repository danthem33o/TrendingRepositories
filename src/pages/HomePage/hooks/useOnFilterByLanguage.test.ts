import { renderHook } from "@testing-library/react";
import * as TrendingQuery from "../../../queries/useTrendingRepositoriesQuery";
import * as State from "../../../state/TrendingRepositories/hooks/useTrendingRepositories";
import { useOnFilterByLanguage } from "./useOnFilterByLanguage";

describe("useOnFilterByLanguage", () => {
  test("should filter the trending repositories by language", () => {
    // ARRANGE:
    const setTrendingMock = jest.fn();

    const useTrendingRepositoriesQueryRest = jest.requireActual(
      "../../../queries/useTrendingRepositoriesQuery"
    );

    const useTrendingRepositoriesRest = jest.requireActual(
      "../../../state/TrendingRepositories/hooks/useTrendingRepositories"
    );

    jest.spyOn(TrendingQuery, "useTrendingRepositoriesQuery").mockReturnValue({
      __esModule: true,
      ...useTrendingRepositoriesQueryRest,
      isSuccess: true,
      isLoading: false,
    });

    jest.spyOn(State, "useTrendingRepositories").mockReturnValue({
      __esModule: true,
      ...useTrendingRepositoriesRest,
      setTrending: setTrendingMock,
      languages: [],
    });

    // ACT:
    renderHook(() => useOnFilterByLanguage());

    // ASSERT:
    expect(setTrendingMock).toBeCalled();
  });
});
