import { renderHook, waitFor } from "@testing-library/react";
import * as StateProvider from "../../context/StateProvider";
import * as Mutation from "../../../queries/useUnstarRepositoryMutation";
import { useUnfavouriteRepository } from "./useUnfavouriteRepository";

jest.mock("../../../queries/useUnstarRepositoryMutation");

describe("useUnfavouriteRepository", () => {
  test("It fires action with expected payload", () => {
    // ARRANGE:
    const mockDispatch = jest.fn();
    jest.spyOn(StateProvider, "useStateContext").mockReturnValue({
      state: {
        trending: [],
        favourites: [],
      },
      dispatch: mockDispatch,
    });

    const mutationSpy = jest.spyOn(Mutation, "useUnstarRepositoryMutation");

    const expected = 1;

    // ACT:
    renderHook(() => useUnfavouriteRepository(expected));

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
