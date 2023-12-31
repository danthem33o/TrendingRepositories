export const HomePageActions = {
  visit: () => {
    cy.init().visit("/");
  },
  filter: (language: string) => {
    cy.findByLabelText("Select languages").type(language + "{enter}");
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
        .findByTitle(`Starred ${noOfStars} times`)
        .should("exist");
    },
    favourite: (target: string) => {
      cy.findByRole("heading", { name: "Trending repositories (Top 10)" })
        .parent()
        .findByText(target)
        .parent()
        .parent()
        .parent()
        .findByRole("button", { name: "Favourite repository" })
        .click();
    },
    unFavourite: (target: string) => {
      cy.findByRole("heading", { name: "Trending repositories (Top 10)" })
        .parent()
        .findByText(target)
        .parent()
        .parent()
        .parent()
        .findByRole("button", { name: "Favourite repository" })
        .click();
    },
  },
  favouritedRepositories: {
    doesExist: (target: string) =>
      cy
        .contains("Favourited repositories")
        .parent()
        .findByText(target)
        .should("exist"),
    doesNotExist: (target: string) =>
      cy
        .contains("Favourited repositories")
        .next()
        .findByText(target)
        .should("not.exist"),
  },
};
