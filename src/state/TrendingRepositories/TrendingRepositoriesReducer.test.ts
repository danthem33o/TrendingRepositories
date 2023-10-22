import { TrendingRepositoriesReducer } from "./TrendingRepositoriesReducer";
import {
  TrendingRepositoriesAction,
  TrendingRepositoriesState,
} from "./TrendingRepositoriesState";

describe("TrendingRepositoriesReducer", () => {
  test("It can initialise the trending repositories", () => {
    // ARRANGE:
    const expected: TrendingRepositoriesState = {
      trending: [
        {
          id: 1,
          name: "1",
          url: "https://example.com",
          description: "1",
          stars: 1,
          createdAt: "1",
        },
      ],
    };

    const initial: TrendingRepositoriesState = {
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
});
