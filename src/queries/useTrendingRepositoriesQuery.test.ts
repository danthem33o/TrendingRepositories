import { PropsWithChildren, createElement } from "react";
import { renderHook } from "@testing-library/react";
import { useTrendingRepositoriesQuery } from "./useTrendingRepositoriesQuery";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SearchRepositoriesApi } from "../api/Repositories/SearchRepositoriesApi";

const wrapper = (props: PropsWithChildren) =>
  createElement(QueryClientProvider, {
    children: props.children,
    client: new QueryClient(),
  });

describe("useTrendingRepositoriesQuery", () => {
  test("It gets a list of trending repositories", async () => {
    // ARRANGE:
    const apiSpy = jest
      .spyOn(SearchRepositoriesApi.prototype, "get")
      .mockReturnValue(
        new Promise((resolve) =>
          resolve({
            data: { total_count: 0, incomplete_results: false, items: [] },
          })
        )
      );

    // ACT:
    renderHook(() => useTrendingRepositoriesQuery(), {
      wrapper,
    });

    // ASSERT:
    expect(apiSpy).toBeCalledTimes(1);
  });
});
