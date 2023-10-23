import { SearchRepositoriesApi } from "./SearchRepositoriesApi";
import { ApiClient } from "../types";

const ApiMock: ApiClient = {
  get: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
};

describe("SearchRepositoriesApi", () => {
  test("'get' will use default parameters if none are passed", () => {
    // ARRANGE:
    const mockedDate = new Date("2023-01-01");
    jest.useFakeTimers().setSystemTime(mockedDate);

    const api = new SearchRepositoriesApi(ApiMock);

    const expectedDate = "2023-01-01T00:00:00.000Z";
    const expectedPage = 1;
    const expectedPageSize = 100;

    // ACT:
    api.get();

    // ASSERT:
    expect(ApiMock.get).toBeCalledTimes(1);
    expect(ApiMock.get).toBeCalledWith(
      encodeURI(
        `https://api.github.com/search/repositories?q=created:<${expectedDate}&page=${expectedPage}&per_page=${expectedPageSize}`
      )
    );
  });

  test("Can override default query string parameters", () => {
    // ARRANGE:
    const mockedDate = new Date("2023-01-01");
    jest.useFakeTimers().setSystemTime(mockedDate);

    const api = new SearchRepositoriesApi(ApiMock);

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
    expect(ApiMock.get).toBeCalledTimes(1);
    expect(ApiMock.get).toBeCalledWith(
      encodeURI(
        `https://api.github.com/search/repositories?q=created:>${expectedDate}&page=${expectedPage}&per_page=${expectedPageSize}&sort=${expectedSort}&order=${expectedOrder}`
      )
    );
  });

  test("Trending repositories can be retrieved", () => {
    // ARRANGE:
    const mockedDate = new Date("2023-01-08");
    jest.useFakeTimers().setSystemTime(mockedDate);

    const api = new SearchRepositoriesApi(ApiMock);

    const expectedDate = "2023-01-01T00:00:00.000Z";
    const expectedSort = "stars";
    const expectedOrder = "desc";

    // ACT:
    api.getTrendingRepositories();

    // ASSERT:
    expect(ApiMock.get).toBeCalledTimes(1);
    expect(ApiMock.get).toBeCalledWith(
      encodeURI(
        `https://api.github.com/search/repositories?q=created:>${expectedDate}&page=1&per_page=10&sort=${expectedSort}&order=${expectedOrder}`
      )
    );
  });

  test("Trending repositories can be filtered by languages", () => {
    // ARRANGE:
    const mockedDate = new Date("2023-01-08");
    jest.useFakeTimers().setSystemTime(mockedDate);

    const api = new SearchRepositoriesApi(ApiMock);

    const expectedDate = "2023-01-01T00:00:00.000Z";
    const expectedSort = "stars";
    const expectedOrder = "desc";
    const expectedLanguage = "javascript";

    // ACT:
    api.getTrendingRepositories({
      languages: [expectedLanguage],
    });

    // ASSERT:
    expect(ApiMock.get).toBeCalledTimes(1);
    expect(ApiMock.get).toBeCalledWith(
      encodeURI(
        `https://api.github.com/search/repositories?q=created:>${expectedDate}+language:${expectedLanguage}&page=1&per_page=10&sort=${expectedSort}&order=${expectedOrder}`
      )
    );
  });
});
