import { ApiClient } from "../types";

export class StarApi {
  public constructor(private api: ApiClient) {
    this.baseUrl = "https://api.github.com/user/starred";
  }

  private baseUrl: string;

  /**
   * Stars a repository.
   *
   * @param ownerName The owner of the repository
   * @param repoName The name of the repository
   * @returns Promise
   */
  public starARepository(ownerName: string, repoName: string) {
    const url = this.baseUrl + `/${ownerName}/${repoName}`;
    return this.api.put(encodeURI(url), { ownerName, repoName });
  }
}
