/// <reference types="cypress" />

import { HomePageActions } from "./utils/HomePageActions";

describe("Favourited repositories", () => {
  beforeEach(() => {
    cy.clock(new Date("2023-01-08"), ["Date"]);
    HomePageActions.visit();
  });

  it("can favourite a trending repository", () => {
    cy.log("Testing that a repository can be favourited");
    HomePageActions.trendingRepositories.favourite("Repository 1");

    cy.log("Testing that the favourited repository is shown");
    HomePageActions.favouritedRepositories.doesExist("Repository 1");
  });
});
