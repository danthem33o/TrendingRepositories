import { trendingRepositoriesInitialState } from "./trendingRepositoriesInitialState";
import { TrendingRepositoriesReducer } from "./TrendingRepositoriesReducer";
import {
  TrendingRepositoriesAction,
  TrendingRepositoriesState,
} from "./TrendingRepositoriesState";

describe("TrendingRepositoriesReducer", () => {
  test("It can initialise the trending repositories", () => {
    // ARRANGE:
    const expected: TrendingRepositoriesState = {
      ...trendingRepositoriesInitialState,
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
    };

    const initial: TrendingRepositoriesState = {
      ...trendingRepositoriesInitialState,
      trending: [],
    };

    const action: TrendingRepositoriesAction = {
      type: "TRENDING_INIT",
      payload: expected,
    };

    // ACT
    const state = TrendingRepositoriesReducer(initial, action);

    // ASSERT
    expect(state).toEqual(expected);
  });

  test("It can favourite a repository", () => {
    // ARRANGE:
    const expectedId = 1;

    const action: TrendingRepositoriesAction = {
      type: "FAVOURITE",
      payload: {
        repositoryId: expectedId,
      },
    };

    const initial: TrendingRepositoriesState = {
      ...trendingRepositoriesInitialState,
      favourites: [],
    };

    // ACT:
    const state = TrendingRepositoriesReducer(initial, action);

    // ASSERT:
    expect(state.favourites).toContain(expectedId);
  });

  test("It should not favourite a repository that has already been favourited", () => {
    // ARRANGE:
    const expected = [1];

    const action: TrendingRepositoriesAction = {
      type: "FAVOURITE",
      payload: {
        repositoryId: 1,
      },
    };

    const initial: TrendingRepositoriesState = {
      ...trendingRepositoriesInitialState,
      favourites: [1],
    };

    // ACT:
    const state = TrendingRepositoriesReducer(initial, action);

    // ASSERT:
    expect(state.favourites).toEqual(expected);
  });
});
