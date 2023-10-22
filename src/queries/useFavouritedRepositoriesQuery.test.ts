import React, { PropsWithChildren } from "react";
import { renderHook } from "@testing-library/react";
import * as ReactQuery from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import { StarApi } from "../api/Stars/StarApi";
import { useFavouritedRepositoriesQuery } from "./useFavouritedRepositoriesQuery";

const wrapper = (props: PropsWithChildren) =>
  React.createElement(ReactQuery.QueryClientProvider, {
    children: props.children,
    client: new QueryClient(),
  });

describe("useFavouritedRepositoriesQuery", () => {
  test("It gets a list of favourited repositories", async () => {
    // ARRANGE:
    const apiSpy = jest.spyOn(StarApi.prototype, "get").mockReturnValue(
      new Promise((resolve) =>
        resolve({
          data: [],
        })
      )
    );

    // ACT:
    renderHook(() => useFavouritedRepositoriesQuery(), {
      wrapper,
    });

    // ASSERT:
    expect(apiSpy).toBeCalledTimes(1);
  });
});
