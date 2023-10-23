import { renderHook, waitFor } from "@testing-library/react";
import * as StateProvider from "../../context/StateProvider";
import { useFavouriteRepository } from "./useFavouriteRepository";
import * as Mutation from "../../../queries/useStarRepositoryMutation";
import { trendingRepositoriesInitialState } from "../trendingRepositoriesInitialState";

jest.mock("../../../queries/useStarRepositoryMutation");

describe("useFavouriteRepository", () => {
  test("It fires action with expected payload", () => {
    // ARRANGE:
    const mockDispatch = jest.fn();
    jest.spyOn(StateProvider, "useStateContext").mockReturnValue({
      state: {
        ...trendingRepositoriesInitialState,
        trending: [],
        favourites: [],
      },
      dispatch: mockDispatch,
    });

    const mutationSpy = jest.spyOn(Mutation, "useStarRepositoryMutation");

    const expected = 1;

    // ACT:
    renderHook(() => useFavouriteRepository(expected));

    // ASSERT:
    // eslint-disable-next-line testing-library/await-async-utils
    waitFor(() => {
      expect(mutationSpy).toBeCalledTimes(1);
    });
    // eslint-disable-next-line testing-library/await-async-utils
    waitFor(() => {
      expect(mutationSpy).toBeCalledWith(
        mockDispatch({
          type: "FAVOURITE",
          payload: { repositoryId: expected },
        })
      );
    });
  });
});
