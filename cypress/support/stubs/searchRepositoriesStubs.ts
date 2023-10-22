Cypress.Commands.add("searchRepositoriesStubs", () => {
  cy.intercept("GET", "*/api.github.com/search/repositories*", {
    fixture: "search_repositories",
  }).as("searchRepositories");
});
