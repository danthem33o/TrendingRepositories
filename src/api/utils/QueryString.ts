export class QueryString {
  /**
   * Parses an object to a query string.
   *
   * @param obj Object to parse to query string.
   * @param parse Object keys to rename.
   * @returns query string.
   */
  public static stringify = <TObj extends { [key: string]: unknown }>(
    obj: TObj,
    parse?: { [key in keyof Partial<TObj>]: string }
  ) => {
    return Object.keys(obj).reduce((qs, key) => {
      if (!qs) {
        qs = "?";
      } else {
        qs += "&";
      }

      const property = obj[key];
      const name = (parse && parse[key]) ?? key;

      return (qs += `${name}=${property}`);
    }, "");
  };
}
