import { renderHook } from "@testing-library/react";
import { SearchRepositoriesApi } from "../api/Repositories/SearchRepositoriesApi";
import { SearchRepositoryConfig } from "../api/Repositories/types";
import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren, createElement } from "react";
import { useSearchRepositoriesQuery } from "./useSearchRepositoriesQuery";

const wrapper = (props: PropsWithChildren) =>
  createElement(QueryClientProvider, {
    children: props.children,
    client: new QueryClient(),
  });

describe("useSearchRepositoriesQuery", () => {
  test("It can filter by optional params", async () => {
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

    const config: SearchRepositoryConfig = {
      languages: ["JavaScript"],
      repos: [{ owner: "owner", repo: "repo" }],
    };

    // ACT:
    renderHook(() => useSearchRepositoriesQuery("queryId", config), {
      wrapper,
    });

    // ASSERT:
    expect(apiSpy).toBeCalledTimes(1);
    expect(apiSpy).toBeCalledWith({
      qualifiers: "language:JavaScript+repo:owner/repo",
    });
  });
});
