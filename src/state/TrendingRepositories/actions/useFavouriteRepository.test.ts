import { renderHook } from "@testing-library/react";
import * as StateProvider from "../../context/StateProvider";
import { useFavouriteRepository } from "./useFavouriteRepository";

describe("useFavouriteRepository", () => {
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

    const expected = 1;

    // ACT:
    renderHook(() => useFavouriteRepository()(expected));

    // ASSERT:
    expect(mockDispatch).toBeCalledTimes(1);
    expect(mockDispatch).toBeCalledWith({
      type: "FAVOURITE",
      payload: { repositoryId: expected },
    });
  });
});
