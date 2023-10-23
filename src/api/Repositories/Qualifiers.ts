import { SearchRepositoriesQualifierOperators } from "./types";

/**
 * Builds a qualifier.
 */
export class Qualifiers {
  public constructor() {
    this.base = "";
  }

  private base: string;

  /**
   * Adds a qualifier to the base property. Multiple qualifiers are
   * split with a '+'.
   *
   * @param qualifier Qualifier being added
   */
  private addQualifier(qualifier: string) {
    if (this.base) {
      this.base += "+" + qualifier;
    } else {
      this.base += qualifier;
    }
  }

  /**
   * Adds a `created` qualifier. The date can be filtered using a range of different operators.
   *
   * @param date Date in which the repository was created
   * @param operator The operator that will be used to compare the date.
   * @returns `Qualifiers`
   */
  public created(date: Date, operator: SearchRepositoriesQualifierOperators) {
    this.addQualifier(`created:${operator}${date.toISOString()}`);
    return this;
  }

  /**
   * Adds a `language` qualifier.
   *
   * @param language language that the repository uses.
   * @returns `Qualifiers`
   */
  public language(language: string) {
    this.addQualifier(`language:${language}`);
    return this;
  }

  /**
   * Adds a `repo` qualifier.
   *
   * @param owner name of the owner of the repository
   * @param repo name of the repository
   * @returns `Qualifiers`
   */
  public repo(owner: string, repo: string) {
    this.addQualifier(`repo:${owner}/${repo}`);
    return this;
  }

  /**
   * Builds the qualifier, using all of the segments provided.
   *
   * @returns {string} a qualifier
   */
  public build() {
    return this.base;
  }
}
