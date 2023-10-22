import { StarredRepository } from "./Stars/types";
import { ApiClient, ApiResponse } from "./types";

const FAVOURITES_KEY = "favourites";
const DEFAULT_KEY = "local";

const addFavourite = (favourite: StarredRepository) => {
  const storedItem = localStorage.getItem(FAVOURITES_KEY);
  const favourites = (
    storedItem ? JSON.parse(storedItem) : []
  ) as StarredRepository[];

  if (
    !favourites.find(
      (s) =>
        s.ownerName === favourite.ownerName && s.repoName === favourite.repoName
    )
  ) {
    favourites.push(favourite);
    localStorage.setItem(FAVOURITES_KEY, JSON.stringify(favourites));
  }
};

const getItems = (key: string) => {
  const storedItems = localStorage.getItem(key);
  return storedItems ? JSON.parse(storedItems) : [];
};

export class LocalStoragApi implements ApiClient {
  public get<TData>(url: string): Promise<ApiResponse<TData>> {
    switch (url) {
      case "https://api.github.com/user/starred": {
        const items = getItems(FAVOURITES_KEY);

        return new Promise((resolve) => resolve({ data: items }));
      }
      default: {
        const items = getItems(DEFAULT_KEY);

        return new Promise((resolve) => resolve({ data: items }));
      }
    }
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
        addFavourite(request as StarredRepository);

        break;
      }
      default: {
        localStorage.setItem(DEFAULT_KEY, JSON.stringify(request));

        break;
      }
    }

    return new Promise((resolve) => resolve({} as TResponse));
  }
}
