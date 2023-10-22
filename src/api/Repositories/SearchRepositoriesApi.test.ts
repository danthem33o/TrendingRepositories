import { SearchRepositoriesApi } from "./SearchRepositoriesApi";
import { Api } from "../Api";

describe("SearchRepositoriesApi", () => {
  test("'get' will use default parameters if none are passed", () => {
    // ARRANGE:
    const mockedDate = new Date("2023-01-01");
    jest.useFakeTimers().setSystemTime(mockedDate);

    const apiSpy = jest.spyOn(Api, "get");
    const api = new SearchRepositoriesApi();

    const expectedDate = "2023-01-01T00:00:00.000Z";
    const expectedPage = 1;
    const expectedPageSize = 100;

    // ACT:
    api.get();

    // ASSERT:
    expect(apiSpy).toBeCalledTimes(1);
    expect(apiSpy).toBeCalledWith(
      encodeURI(
        `https://api.github.com/search/repositories?q=created:<${expectedDate}&page=${expectedPage}&per_page=${expectedPageSize}`
      )
    );
  });

  test("Can override default query string parameters", () => {
    // ARRANGE:
    const mockedDate = new Date("2023-01-01");
    jest.useFakeTimers().setSystemTime(mockedDate);

    const apiSpy = jest.spyOn(Api, "get");
    const api = new SearchRepositoriesApi();

    const expectedDate = "2011-01-01";
    const expectedSort = "forks";
    const expectedOrder = "asc";
    const expectedPage = 2;
    const expectedPageSize = 15;

    // ACT:
    api.get({
      qualifiers: `created:>${expectedDate}`,
      sort: expectedSort,
      order: expectedOrder,
      page: expectedPage,
      perPage: expectedPageSize,
    });

    // ASSERT:
    expect(apiSpy).toBeCalledTimes(1);
    expect(apiSpy).toBeCalledWith(
      encodeURI(
        `https://api.github.com/search/repositories?q=created:>${expectedDate}&page=${expectedPage}&per_page=${expectedPageSize}&sort=${expectedSort}&order=${expectedOrder}`
      )
    );
  });

  test("Trending repositories can be retrieved", () => {
    // ARRANGE:
    const mockedDate = new Date("2023-01-08");
    jest.useFakeTimers().setSystemTime(mockedDate);

    const apiSpy = jest.spyOn(Api, "get");
    const api = new SearchRepositoriesApi();

    const expectedDate = "2023-01-01T00:00:00.000Z";
    const expectedSort = "stars";
    const expectedOrder = "desc";

    // ACT:
    api.getTrendingRepositories();

    // ASSERT:
    expect(apiSpy).toBeCalledTimes(1);
    expect(apiSpy).toBeCalledWith(
      encodeURI(
        `https://api.github.com/search/repositories?q=created:>${expectedDate}&page=1&per_page=10&sort=${expectedSort}&order=${expectedOrder}`
      )
    );
  });
});
