import { renderHook } from "@testing-library/react";
import * as Query from "../../../queries/useTrendingRepositoriesQuery";
import * as State from "../../../state/TrendingRepositories/hooks/useTrendingRepositories";
import { useSetup } from "./useSetup";

describe("useSetup", () => {
  test("It should not initialise state if data is loading", () => {
    // ARRANGE:
    const initialiseMock = jest.fn();

    const useTrendingRepositoriesQueryRest = jest.requireActual(
      "../../../queries/useTrendingRepositoriesQuery"
    );

    const useTrendingRepositoriesRest = jest.requireActual(
      "../../../state/TrendingRepositories/hooks/useTrendingRepositories"
    );

    jest.spyOn(Query, "useTrendingRepositoriesQuery").mockReturnValue({
      __esModule: true,
      ...useTrendingRepositoriesQueryRest,
      isSuccess: true,
      isLoading: true,
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

    const useTrendingRepositoriesRest = jest.requireActual(
      "../../../state/TrendingRepositories/hooks/useTrendingRepositories"
    );

    jest.spyOn(Query, "useTrendingRepositoriesQuery").mockReturnValue({
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

    jest.spyOn(State, "useTrendingRepositories").mockReturnValue({
      __esModule: true,
      ...useTrendingRepositoriesRest,
      initialise: initialiseMock,
    });

    // ACT:
    renderHook(() => useSetup());

    // ASSERT:
    expect(initialiseMock).toBeCalledTimes(1);
    expect(initialiseMock).toBeCalledWith([]);
  });
});
