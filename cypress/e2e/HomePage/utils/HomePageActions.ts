export const HomePageActions = {
  visit: () => {
    cy.init().visit("/");
    cy.wait("@searchRepositories");
  },
  trendingRepositories: {
    requestParams: (requestAlias: string, query: string) => {
      cy.get(requestAlias)
        .its("request.url")
        .should("include", encodeURI(query));
    },
    hasInfo: (
      target: number,
      name: string,
      url: string,
      description: string,
      noOfStars: number
    ) => {
      cy.findAllByLabelText("Repository information")
        .eq(target)
        .should("contain", name)
        .should("contain", description)
        .findByLabelText("Repository link")
        .should("have.attr", "href", url);

      cy.findAllByLabelText("Repository information")
        .eq(target)
        .findByText("Stars")
        .parent()
        .should("contain", noOfStars);
    },
    favourite: (target: string) => {
      cy.findByText("Trending repositories")
        .next()
        .findByText(target)
        .parent()
        .parent()
        .findByRole("button", { name: "Favourite repository" })
        .click();
    },
  },
  favouritedRepositories: {
    doesExist: (target: string) =>
      cy
        .findByText("Favourited repositories")
        .next()
        .findByText(target)
        .should("exist"),
  },
};
