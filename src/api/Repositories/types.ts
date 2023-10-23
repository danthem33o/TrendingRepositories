/**
 * Structure of the API response from Github's search APIs.
 */
export interface SearchResponse<TItem> {
  total_count: number;
  incomplete_results: boolean;
  items: TItem[];
}

/**
 * Github repository.
 */
export interface Repository {
  id: number;
  name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
  created_at: string;
  languages_url: string;
  owner: {
    login: string;
  };
}

/**
 * Repository's search API response.
 */
export type SearchRepositoriesResponse = SearchResponse<Repository>;

/**
 * Operators that can be applied to repository's search qualifiers.
 */
export type SearchRepositoriesQualifierOperators = ">" | "<" | ">=" | "<=";

/**
 * Query strings accepted by Repository's search API.
 */
export interface SearchRepositoriesQueryStrings extends Partial<Pagination> {
  qualifiers: string;
  sort?: "stars" | "forks" | "help-wanted-issues" | "updated";
  order?: "desc" | "asc";
}

/**
 * Pagination options
 */
export interface Pagination {
  page: number;
  perPage: number;
}
