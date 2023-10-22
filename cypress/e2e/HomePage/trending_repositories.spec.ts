/// <reference types="cypress" />

import { HomePageActions } from "./utils/HomePageActions";

describe("Trending repositories", () => {
  beforeEach(() => {
    cy.clock(new Date("2023-01-08"), ["Date"]);
    HomePageActions.visit();
  });

  it("should show a list of trending repositories that have been created in the last 7 days", () => {
    cy.log("Testing that only the first 10 are requested");
    HomePageActions.trendingRepositories.requestParams(
      "@searchRepositories",
      "?q=created:>2023-01-01T00:00:00.000Z&page=1&per_page=10&sort=stars&order=desc"
    );

    cy.log("Testing that trending repositories have the correct information");
    HomePageActions.trendingRepositories.hasInfo(
      0,
      "Repository 1",
      "https://example.com/repository1",
      "This is the repository for one",
      3643
    );
  });
});
