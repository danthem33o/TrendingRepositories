import { SearchRepositoriesQualifierOperators } from "./types";

export class Qualifiers {
  public constructor() {
    this.base = "";
  }

  private base: string;

  private addQualifier(qualifier: string) {
    if (this.base) {
      this.base += "+" + qualifier;
    } else {
      this.base += qualifier;
    }
  }

  public created(date: Date, operator: SearchRepositoriesQualifierOperators) {
    this.addQualifier(`created:${operator}${date.toISOString()}`);
    return this;
  }

  public language(language: string) {
    this.addQualifier(`language:${language}`);
    return this;
  }

  public repo(owner: string, repo: string) {
    this.addQualifier(`repo:${owner}/${repo}`);
    return this;
  }

  public build() {
    return this.base;
  }
}
