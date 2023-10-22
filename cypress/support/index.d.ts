declare namespace Cypress {
  interface Chainable {
    init(): Chainable<Element>;
    searchRepositoriesStubs(): Chainable<Element>;
  }
}
