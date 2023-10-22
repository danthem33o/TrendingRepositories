import { Api } from "../Api";
import { QueryString } from "../utils/QueryString";
import { Qualifiers } from "./Qualifiers";
import {
  Pagination,
  SearchRepositoriesQueryStrings,
  SearchRepositoriesResponse,
} from "./types";

const SEVEN_DAYS = 7;

export class SearchRepositoriesApi {
  public constructor() {
    this.baseUrl = "https://api.github.com/search/repositories";
  }

  private baseUrl: string;

  /**
   * Searches for github repositories with the given parameters.
   *
   * @param queryStrings Repository's search API query strings. Default parameters:
   * - `created:` is `<today`
   * - `page` is `1`
   * - `perPage` is `100`
   *
   * @returns `SearchRepositoriesResponse`
   */
  public get(queryStrings?: SearchRepositoriesQueryStrings) {
    const qs = QueryString.stringify(
      {
        qualifiers: new Qualifiers().created(new Date(), "<").build(),
        page: 1,
        perPage: 100,
        ...(queryStrings ?? {}),
      },
      { qualifiers: "q", perPage: "per_page" }
    );

    return Api.get<SearchRepositoriesResponse>(
      encodeURI(this.baseUrl + `${qs}`)
    );
  }

  /**
   * Searches for repositories that are trending and have been created in the
   * last seven days.
   */
  public getTrendingRepositories(
    { page, perPage }: Pagination = { page: 1, perPage: 10 }
  ) {
    const lastSevenDays = new Date(
      new Date().setDate(new Date().getDate() - SEVEN_DAYS)
    );

    return this.get({
      qualifiers: new Qualifiers().created(lastSevenDays, ">").build(),
      sort: "stars",
      order: "desc",
      page,
      perPage,
    });
  }
}