import { SearchRepositoriesQualifierOperators } from "./types";

export class Qualifiers {
  public constructor() {
    this.base = "";
  }

  private base: string;

  public created(date: Date, operator: SearchRepositoriesQualifierOperators) {
    this.base += `created:${operator}${date.toISOString()}`;
    return this;
  }

  public build() {
    return this.base;
  }
}
