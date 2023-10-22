import { renderHook } from "@testing-library/react";
import * as TrendingQuery from "../../../queries/useTrendingRepositoriesQuery";
import * as FavouritesQuery from "../../../queries/useFavouritedRepositoriesQuery";
import * as State from "../../../state/TrendingRepositories/hooks/useTrendingRepositories";
import { useSetup } from "./useSetup";

describe("useSetup", () => {
  test("It should not initialise state if data is loading", () => {
    // ARRANGE:
    const initialiseMock = jest.fn();

    const useTrendingRepositoriesQueryRest = jest.requireActual(
      "../../../queries/useTrendingRepositoriesQuery"
    );

    const useFavouritedRepositoriesQueryRest = jest.requireActual(
      "../../../queries/useFavouritedRepositoriesQuery"
    );

    const useTrendingRepositoriesRest = jest.requireActual(
      "../../../state/TrendingRepositories/hooks/useTrendingRepositories"
    );

    jest.spyOn(TrendingQuery, "useTrendingRepositoriesQuery").mockReturnValue({
      __esModule: true,
      ...useTrendingRepositoriesQueryRest,
      isSuccess: true,
      isLoading: true,
    });

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

    jest.spyOn(State, "useTrendingRepositories").mockReturnValue({
      __esModule: true,
      ...useTrendingRepositoriesRest,
      initialise: initialiseMock,
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

    const useFavouritedRepositoriesQueryRest = jest.requireActual(
      "../../../queries/useFavouritedRepositoriesQuery"
    );

    const useTrendingRepositoriesRest = jest.requireActual(
      "../../../state/TrendingRepositories/hooks/useTrendingRepositories"
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

    jest.spyOn(State, "useTrendingRepositories").mockReturnValue({
      __esModule: true,
      ...useTrendingRepositoriesRest,
      initialise: initialiseMock,
    });

    // ACT:
    renderHook(() => useSetup());

    // ASSERT:
    expect(initialiseMock).toBeCalledTimes(1);
    expect(initialiseMock).toBeCalledWith([], []);
  });
});
