import { renderHook } from "@testing-library/react";
import * as TrendingQuery from "../../../queries/useTrendingRepositoriesQuery";
import * as FavouritesQuery from "../../../queries/useFavouritedRepositoriesQuery";
import * as SearchQuery from "../../../queries/useSearchRepositoriesQuery";
import * as State from "../../../state/TrendingRepositories/hooks/useTrendingRepositories";
import { useSetup } from "./useSetup";

jest.mock("../../../queries/useTrendingRepositoriesQuery");
jest.mock("../../../queries/useFavouritedRepositoriesQuery");
jest.mock("../../../queries/useSearchRepositoriesQuery");
jest.mock("../../../state/TrendingRepositories/hooks/useTrendingRepositories");

describe("useSetup", () => {
  beforeEach(() => jest.resetAllMocks());

  test("It should not initialise state if data is loading", () => {
    // ARRANGE:
    const initialiseMock = jest.fn();

    (TrendingQuery.useTrendingRepositoriesQuery as jest.Mock).mockReturnValue({
      isSuccess: true,
      isLoading: true,
    });

    (
      FavouritesQuery.useFavouritedRepositoriesQuery as jest.Mock
    ).mockReturnValue({
      isSuccess: true,
      isLoading: true,
      data: {
        data: [],
      },
    });

    (SearchQuery.useSearchRepositoriesQuery as jest.Mock).mockReturnValue({
      isSuccess: true,
      isLoading: true,
      data: {
        data: [],
      },
    });

    (State.useTrendingRepositories as jest.Mock).mockReturnValue({
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

    (TrendingQuery.useTrendingRepositoriesQuery as jest.Mock).mockReturnValue({
      isSuccess: true,
      isLoading: false,
    });

    (
      FavouritesQuery.useFavouritedRepositoriesQuery as jest.Mock
    ).mockReturnValue({
      isSuccess: true,
      isLoading: false,
      data: {
        data: [],
      },
    });

    (SearchQuery.useSearchRepositoriesQuery as jest.Mock).mockReturnValue({
      isSuccess: true,
      isLoading: false,
    });

    (State.useTrendingRepositories as jest.Mock).mockReturnValue({
      initialise: initialiseMock,
    });

    // ACT:
    renderHook(() => useSetup());

    // ASSERT:
    expect(initialiseMock).toBeCalledTimes(1);
    expect(initialiseMock).toBeCalledWith([], []);
  });

  test("It should not search for favourites if none are set", () => {
    // ARRANGE:
    const initialiseMock = jest.fn();

    (TrendingQuery.useTrendingRepositoriesQuery as jest.Mock).mockReturnValue({
      isSuccess: true,
      isLoading: false,
      data: {
        data: {
          items: [],
        },
      },
    });

    (
      FavouritesQuery.useFavouritedRepositoriesQuery as jest.Mock
    ).mockReturnValue({
      isSuccess: true,
      isLoading: false,
      data: {
        data: [],
      },
    });

    (SearchQuery.useSearchRepositoriesQuery as jest.Mock).mockReturnValue({
      isSuccess: true,
      isLoading: false,
      data: {
        data: {
          items: [],
        },
      },
    });

    (State.useTrendingRepositories as jest.Mock).mockReturnValue({
      initialise: initialiseMock,
    });

    // ACT:
    renderHook(() => useSetup());

    // ASSERT:
    expect(SearchQuery.useSearchRepositoriesQuery).toBeCalledWith(
      expect.anything(),
      expect.anything(),
      false
    );
  });
});
