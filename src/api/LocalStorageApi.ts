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

const removeFavourite = (url: string) => {
  const segments = url
    .split("https://api.github.com/user/starred/")[1]
    .split("/");

  let favourites: StarredRepository[] = getItems(FAVOURITES_KEY);

  favourites = favourites.filter(
    (s) => !(s.ownerName === segments[0] && s.repoName === segments[1])
  );

  localStorage.setItem(FAVOURITES_KEY, JSON.stringify(favourites));
};

export class LocalStoragApi implements ApiClient {
  public delete<TResponse>(url: string): Promise<TResponse> {
    if (url.match("https://api.github.com/user/starred/")) {
      removeFavourite(url);
    } else {
      localStorage.removeItem(DEFAULT_KEY);
    }

    return new Promise((resolve) => resolve({} as TResponse));
  }

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
    if (url.match("https://api.github.com/user/starred/")) {
      addFavourite(request as StarredRepository);
    } else {
      localStorage.setItem(DEFAULT_KEY, JSON.stringify(request));
    }

    return new Promise((resolve) => resolve({} as TResponse));
  }
}
