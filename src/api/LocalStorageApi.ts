import { ApiClient, ApiResponse } from "./types";

type Favourite = { ownerName: string; repoName: string };

const addFavourite = (favourite: Favourite) => {
  const storedItem = localStorage.getItem("favourites");
  const favourites = (storedItem ? JSON.parse(storedItem) : []) as Favourite[];

  if (
    !favourites.find(
      (s) =>
        s.ownerName === favourite.ownerName && s.repoName === favourite.repoName
    )
  ) {
    favourites.push(favourite);
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }
};

export class LocalStoragApi implements ApiClient {
  public get<TData>(_: string): Promise<ApiResponse<TData>> {
    throw new Error("Method not implemented.");
  }

  public put<TRequest, TResponse>(
    url: string,
    request?: TRequest | undefined
  ): Promise<TResponse> {
    switch (url) {
      case `https://api.github.com/user/starred/${
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (request as any)?.ownerName
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }/${(request as any)?.repoName}`: {
        addFavourite(request as Favourite);

        break;
      }
      default: {
        localStorage.setItem("local", JSON.stringify(request));

        break;
      }
    }

    return new Promise((resolve) => resolve({} as TResponse));
  }
}
