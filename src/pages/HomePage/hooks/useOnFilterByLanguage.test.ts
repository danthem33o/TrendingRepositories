import { renderHook } from "@testing-library/react";
import * as TrendingQuery from "../../../queries/useTrendingRepositoriesQuery";
import * as State from "../../../state/TrendingRepositories/hooks/useTrendingRepositories";
import { useOnFilterByLanguage } from "./useOnFilterByLanguage";

jest.mock("../../../queries/useTrendingRepositoriesQuery");
jest.mock("../../../state/TrendingRepositories/hooks/useTrendingRepositories");

describe("useOnFilterByLanguage", () => {
  test("should filter the trending repositories by language", () => {
    // ARRANGE:
    const setTrendingMock = jest.fn();

    (TrendingQuery.useTrendingRepositoriesQuery as jest.Mock).mockReturnValue({
      isSuccess: true,
      isLoading: false,
    });

    (State.useTrendingRepositories as jest.Mock).mockReturnValue({
      setTrending: setTrendingMock,
      languages: [],
    });

    // ACT:
    renderHook(() => useOnFilterByLanguage());

    // ASSERT:
    expect(setTrendingMock).toBeCalled();
  });
});
