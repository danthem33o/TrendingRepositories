import { render, renderHook, screen } from "@testing-library/react";
import { StateProvider, useStateContext } from "./StateProvider";
import React from "react";
import { TrendingRepositoriesState } from "../TrendingRepositories/TrendingRepositoriesState";

describe("StateProvider", () => {
  test("The app can be rendered with provider", () => {
    // ARRANGE:
    render(
      <StateProvider>
        <div>App</div>
      </StateProvider>
    );

    // ASSERT:
    expect(screen.getByText("App")).not.toBeUndefined();
  });

  test("An initial state can be given", () => {
    // ARRANGE:
    const useReducerSpy = jest.spyOn(React, "useReducer");

    const state: TrendingRepositoriesState = {
      trending: [
        {
          id: 1,
          name: "1",
          url: "https://example.com",
          description: "1",
          stars: 1,
          createdAt: "1",
          owner: {
            name: "Owner",
          },
        },
      ],
      favourites: [],
    };

    render(
      <StateProvider initialState={state}>
        <div>App</div>
      </StateProvider>
    );

    // ASSERT:
    expect(useReducerSpy).lastCalledWith(expect.anything(), state);
  });

  describe("useStateContext", () => {
    test("throws an error if context is undefined", () => {
      // ARRANGE:
      jest.spyOn(React, "useContext").mockReturnValue(undefined);

      // ACT & ASSERT:
      renderHook(() => expect(() => useStateContext()).toThrowError());
    });

    test("Returns state and dispatch", () => {
      // ARRANGE:
      jest.spyOn(React, "useContext").mockReturnValue({
        state: {},
        dispatch: jest.fn(),
      });

      // ACT:
      const { result } = renderHook(() => useStateContext());

      // ASSERT:
      expect(result.current).not.toBeUndefined();
    });
  });
});
