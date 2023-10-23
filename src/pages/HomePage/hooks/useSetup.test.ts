import { renderHook } from "@testing-library/react";
import * as TrendingQuery from "../../../queries/useTrendingRepositoriesQuery";
import * as FavouritesQuery from "../../../queries/useFavouritedRepositoriesQuery";
import * as SearchQuery from "../../../queries/useSearchRepositoriesQuery";
import * as State from "../../../state/TrendingRepositories/hooks/useTrendingRepositories";
import { useSetup } from "./useSetup";

describe("useSetup", () => {
  test("It should not initialise state if data is loading", () => {
    // ARRANGE:
    const initialiseMock = jest.fn();

    const useTrendingRepositoriesQueryRest = jest.requireActual(
      "../../../queries/useTrendingRepositoriesQuery"
    );
    jest.spyOn(TrendingQuery, "useTrendingRepositoriesQuery").mockReturnValue({
      __esModule: true,
      ...useTrendingRepositoriesQueryRest,
      isSuccess: true,
      isLoading: true,
    });

    const useFavouritedRepositoriesQueryRest = jest.requireActual(
      "../../../queries/useFavouritedRepositoriesQuery"
    );
    jest
      .spyOn(FavouritesQuery, "useFavouritedRepositoriesQuery")
      .mockReturnValueOnce({
        __esModule: true,
        ...useFavouritedRepositoriesQueryRest,
        isSuccess: true,
        isLoading: true,
        data: {
          data: [],
        },
      });

    const useTrendingRepositoriesRest = jest.requireActual(
      "../../../state/TrendingRepositories/hooks/useTrendingRepositories"
    );
    jest.spyOn(State, "useTrendingRepositories").mockReturnValue({
      __esModule: true,
      ...useTrendingRepositoriesRest,
      initialise: initialiseMock,
    });

    const useSearchRepositoriesQueryRest = jest.requireActual(
      "../../../state/TrendingRepositories/hooks/useTrendingRepositories"
    );
    jest.spyOn(SearchQuery, "useSearchRepositoriesQuery").mockReturnValue({
      __esModule: true,
      ...useSearchRepositoriesQueryRest,
      initialise: jest.fn(),
    });

    // ACT:
    renderHook(() => useSetup());

    // ASSERT:
    expect(initialiseMock).not.toBeCalled();
  });

  test("It should initialise state if the request has finished loading and was successful", () => {
    // ARRANGE:
    const initialiseMock = jest.fn();

    const useTrendingRepositoriesQueryRest = jest.requireActual(
      "../../../queries/useTrendingRepositoriesQuery"
    );
    jest.spyOn(TrendingQuery, "useTrendingRepositoriesQuery").mockReturnValue({
      __esModule: true,
      ...useTrendingRepositoriesQueryRest,
      isSuccess: true,
      isLoading: false,
      data: {
        data: {
          items: [],
        },
      },
    });

    const useFavouritedRepositoriesQueryRest = jest.requireActual(
      "../../../queries/useFavouritedRepositoriesQuery"
    );
    jest
      .spyOn(FavouritesQuery, "useFavouritedRepositoriesQuery")
      .mockReturnValueOnce({
        __esModule: true,
        ...useFavouritedRepositoriesQueryRest,
        isSuccess: true,
        isLoading: false,
        data: {
          data: [],
        },
      });

    const useTrendingRepositoriesRest = jest.requireActual(
      "../../../state/TrendingRepositories/hooks/useTrendingRepositories"
    );
    jest.spyOn(State, "useTrendingRepositories").mockReturnValue({
      __esModule: true,
      ...useTrendingRepositoriesRest,
      initialise: initialiseMock,
    });

    const useSearchRepositoriesQueryRest = jest.requireActual(
      "../../../state/TrendingRepositories/hooks/useTrendingRepositories"
    );
    jest.spyOn(SearchQuery, "useSearchRepositoriesQuery").mockReturnValue({
      __esModule: true,
      ...useSearchRepositoriesQueryRest,
      initialise: jest.fn(),
      isSuccess: true,
      isLoading: false,
      data: {
        data: {
          items: [],
        },
      },
    });

    // ACT:
    renderHook(() => useSetup());

    // ASSERT:
    expect(initialiseMock).toBeCalledTimes(1);
    expect(initialiseMock).toBeCalledWith([], []);
  });
});
