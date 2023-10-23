/// <reference types="cypress" />

import { HomePageActions } from "./utils/HomePageActions";

describe("Favourited repositories", () => {
  beforeEach(() => {
    cy.clock(new Date("2023-01-08"), ["Date"]);

    let intercept = 1;

    HomePageActions.visit();

    cy.intercept("GET", "*/api.github.com/search/repositories*", (req) => {
      req.reply((res) => {
        switch (intercept) {
          case 1: {
            res.send({ fixture: "search_repositories.json" });
            break;
          }
          case 2: {
            res.send({ totalCount: 0, incomplete_results: 0, items: [] });
            break;
          }
          default: {
            res.send({ fixture: "search_repositories.json" });
            break;
          }
        }

        intercept += 1;
      });
    }).as("get_override");
  });

  it("can favourite and unfavourite a trending repository", () => {
    cy.get("@get_override.all");

    cy.log("Testing that a repository can be favourited");
    HomePageActions.trendingRepositories.favourite("Repository 1");

    cy.log("Testing that the favourited repository is shown");
    HomePageActions.favouritedRepositories.doesExist("Repository 1");

    cy.log("Testing that a repository can be unfavourited");
    HomePageActions.trendingRepositories.unFavourite("Repository 1");

    cy.log("Testing that the unfavourited repository is not shown");
    HomePageActions.favouritedRepositories.doesNotExist("Repository 1");
  });
});
