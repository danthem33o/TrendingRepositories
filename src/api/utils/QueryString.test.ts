import { QueryString } from "./QueryString";

describe("QueryString", () => {
  test("a query string is created from an object", () => {
    // ARRANGE:
    const obj = {
      queryOne: "q1",
      queryTwo: true,
      queryThree: 3,
    };

    // ACT:
    const qs = QueryString.stringify(obj);

    // ASSERT:
    expect(qs).toBe("?queryOne=q1&queryTwo=true&queryThree=3");
  });

  test("a query name can be parsed to another name", () => {
    // ARRANGE:
    const obj = {
      queryOne: "q1",
      queryThree: true,
      queryFour: 3,
    };

    // ACT:
    const qs = QueryString.stringify(obj, {
      queryThree: "query_two",
      queryFour: "queryThree",
    });

    // ASSERT:
    expect(qs).toBe("?queryOne=q1&query_two=true&queryThree=3");
  });
});
