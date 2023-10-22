import { render, renderHook, screen } from "@testing-library/react";
import { StateProvider, useStateContext } from "./StateProvider";
import React from "react";

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
