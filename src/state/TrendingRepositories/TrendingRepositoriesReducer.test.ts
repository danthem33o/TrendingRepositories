import { trendingRepositoriesInitialState } from "./trendingRepositoriesInitialState";
import { TrendingRepositoriesReducer } from "./TrendingRepositoriesReducer";
import {
  TrendingRepositoriesAction,
  TrendingRepositoriesState,
} from "./TrendingRepositoriesState";
import { Repository } from "./types";

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
    const expected: Repository = {
      id: 1,
      name: "1",
      url: "1",
      description: "1",
      stars: 0,
      createdAt: "-",
      owner: {
        name: "-",
      },
    };

    const action: TrendingRepositoriesAction = {
      type: "FAVOURITE",
      payload: {
        repository: expected,
      },
    };

    const initial: TrendingRepositoriesState = {
      ...trendingRepositoriesInitialState,
      favourites: [],
    };

    // ACT:
    const state = TrendingRepositoriesReducer(initial, action);

    // ASSERT:
    expect(
      state.favourites.find((s) => s.id === expected.id)
    ).not.toBeUndefined();
  });

  test("It should not favourite a repository that has already been favourited", () => {
    // ARRANGE:
    const expected: Repository = {
      id: 1,
      name: "1",
      url: "1",
      description: "1",
      stars: 0,
      createdAt: "-",
      owner: {
        name: "-",
      },
    };

    const action: TrendingRepositoriesAction = {
      type: "FAVOURITE",
      payload: {
        repository: expected,
      },
    };

    const initial: TrendingRepositoriesState = {
      ...trendingRepositoriesInitialState,
      favourites: [expected],
    };

    // ACT:
    const state = TrendingRepositoriesReducer(initial, action);

    // ASSERT:
    expect(state.favourites).toEqual([expected]);
  });

  test("It unfavourites a repository", () => {
    // ARRANGE:
    const expected: Repository = {
      id: 1,
      name: "1",
      url: "1",
      description: "1",
      stars: 0,
      createdAt: "-",
      owner: {
        name: "-",
      },
    };

    const action: TrendingRepositoriesAction = {
      type: "UNFAVOURITE",
      payload: {
        repository: expected,
      },
    };

    const initial: TrendingRepositoriesState = {
      ...trendingRepositoriesInitialState,
      favourites: [expected],
    };

    // ACT:
    const state = TrendingRepositoriesReducer(initial, action);

    // ASSERT:
    expect(state.favourites.find((s) => s.id === expected.id)).toBeUndefined();
  });

  test("Can filter by languages", () => {
    // ARRANGE:
    const expected = ["C#", "JavaScript", "TypeScript"];

    const action: TrendingRepositoriesAction = {
      type: "FILTER_BY_LANGUAGES",
      payload: {
        languages: expected,
      },
    };

    const initial: TrendingRepositoriesState = {
      ...trendingRepositoriesInitialState,
      languages: [],
    };

    // ACT:
    const state = TrendingRepositoriesReducer(initial, action);

    // ASSERT:
    expect(state.languages).toEqual(expected);
  });

  test("Can set trending languages", () => {
    // ARRANGE:
    const expected = [
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
    ];

    const action: TrendingRepositoriesAction = {
      type: "SET_TRENDING",
      payload: {
        trending: expected,
      },
    };

    const initial: TrendingRepositoriesState = {
      ...trendingRepositoriesInitialState,
      trending: [],
    };

    // ACT:
    const state = TrendingRepositoriesReducer(initial, action);

    // ASSERT:
    expect(state.trending).toEqual(expected);
  });
});
