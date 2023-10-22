import { ApiClient, ApiResponse } from "./types";

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
        localStorage.setItem("favourites", JSON.stringify(request));

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
