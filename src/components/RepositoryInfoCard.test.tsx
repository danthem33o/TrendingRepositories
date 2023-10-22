import { fireEvent, render, screen } from "@testing-library/react";
import { StateProvider } from "../state/context/StateProvider";
import { RepositoryInfoCard } from "./RepositoryInfoCard";
import * as Hooks from "../state/TrendingRepositories/hooks/useTrendingRepositories";

describe("RepositoryInfoCard", () => {
  test('Button should show "Favourite" if it has not yet been favourited', () => {
    // ARRANGE:
    const actual = jest.requireActual(
      "../state/TrendingRepositories/hooks/useTrendingRepositories"
    );

    jest.spyOn(Hooks, "useTrendingRepositories").mockReturnValue({
      __esModule: true,
      ...actual,
      checkIsFavourited: () => false,
    });

    render(
      <StateProvider>
        <RepositoryInfoCard
          id={1}
          name="1"
          githubLink="-"
          numberOfStars={1}
          description="1"
        />
      </StateProvider>
    );

    // ASSERT:
    expect(
      screen.getByRole("button", { name: "Favourite repository" })
    ).toContainHTML("Favourite");
  });

  test('Button should show "Favourited" if it has been favourited', () => {
    // ARRANGE:
    const actual = jest.requireActual(
      "../state/TrendingRepositories/hooks/useTrendingRepositories"
    );

    jest.spyOn(Hooks, "useTrendingRepositories").mockReturnValue({
      __esModule: true,
      ...actual,
      checkIsFavourited: () => true,
    });

    render(
      <StateProvider>
        <RepositoryInfoCard
          id={1}
          name="1"
          githubLink="-"
          numberOfStars={1}
          description="1"
        />
      </StateProvider>
    );

    // ASSERT:
    expect(
      screen.getByRole("button", { name: "Favourite repository" })
    ).toContainHTML("Favourited");
  });

  test("A repository can be favourited", () => {
    // ARRANGE:
    const actual = jest.requireActual(
      "../state/TrendingRepositories/hooks/useTrendingRepositories"
    );

    const favouriteRepositoryMock = jest.fn();

    jest.spyOn(Hooks, "useTrendingRepositories").mockReturnValue({
      __esModule: true,
      ...actual,
      checkIsFavourited: jest.fn(),
      favouriteRepository: favouriteRepositoryMock,
    });

    render(
      <StateProvider>
        <RepositoryInfoCard
          id={1}
          name="1"
          githubLink="-"
          numberOfStars={1}
          description="1"
        />
      </StateProvider>
    );

    // ACT:
    fireEvent.click(
      screen.getByRole("button", { name: "Favourite repository" })
    );

    // ASSERT:
    expect(favouriteRepositoryMock).toBeCalledTimes(1);
    expect(favouriteRepositoryMock).toBeCalledWith(1);
  });
});
