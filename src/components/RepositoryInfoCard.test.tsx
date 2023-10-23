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
      useFavouriteRepository: () => ({
        mutate: jest.fn(),
        isPending: false,
      }),
      useUnfavouriteRepository: () => ({
        mutate: jest.fn(),
        isPending: false,
      }),
    });

    render(
      <StateProvider>
        <RepositoryInfoCard
          id={1}
          name="1"
          ownerName="Owner"
          githubLink="-"
          numberOfStars={1}
          description="1"
        />
      </StateProvider>
    );

    // ASSERT:
    expect(screen.getByTitle("Favourite")).not.toBeUndefined();
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
      useFavouriteRepository: () => ({
        mutate: jest.fn(),
        isPending: false,
      }),
      useUnfavouriteRepository: () => ({
        mutate: jest.fn(),
        isPending: false,
      }),
    });

    render(
      <StateProvider>
        <RepositoryInfoCard
          id={1}
          name="1"
          ownerName="Owner"
          githubLink="-"
          numberOfStars={1}
          description="1"
        />
      </StateProvider>
    );

    // ASSERT:
    expect(screen.getByTitle("Favourited")).not.toBeUndefined();
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
      checkIsFavourited: () => false,
      useFavouriteRepository: () => ({
        mutate: favouriteRepositoryMock,
        isPending: false,
      }),
      useUnfavouriteRepository: () => ({
        mutate: jest.fn(),
        isPending: false,
      }),
    });

    render(
      <StateProvider>
        <RepositoryInfoCard
          id={1}
          name="1"
          ownerName="Owner"
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
    expect(favouriteRepositoryMock).toBeCalledWith({
      ownerName: "Owner",
      repoName: "1",
    });
  });

  test("A repository can be unfavourited", () => {
    // ARRANGE:
    const actual = jest.requireActual(
      "../state/TrendingRepositories/hooks/useTrendingRepositories"
    );

    const unfavouriteRepositoryMock = jest.fn();

    jest.spyOn(Hooks, "useTrendingRepositories").mockReturnValue({
      __esModule: true,
      ...actual,
      checkIsFavourited: () => true,
      useFavouriteRepository: () => ({
        mutate: jest.fn(),
        isPending: false,
      }),
      useUnfavouriteRepository: () => ({
        mutate: unfavouriteRepositoryMock,
        isPending: false,
      }),
    });

    render(
      <StateProvider>
        <RepositoryInfoCard
          id={1}
          name="1"
          ownerName="Owner"
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
    expect(unfavouriteRepositoryMock).toBeCalledTimes(1);
    expect(unfavouriteRepositoryMock).toBeCalledWith({
      ownerName: "Owner",
      repoName: "1",
    });
  });
});
