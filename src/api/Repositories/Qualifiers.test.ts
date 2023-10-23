import { Qualifiers } from "./Qualifiers";

describe("Qualifiers", () => {
  test("Creates a 'created' qualifier", () => {
    // ACT:
    const qualifiers = new Qualifiers()
      .created(new Date("2023-01-01"), ">")
      .build();

    // ASSERT:
    expect(qualifiers).toBe(`created:>2023-01-01T00:00:00.000Z`);
  });

  test("Creates a 'language' qualifier", () => {
    // ACT:
    const qualifiers = new Qualifiers().language("javascript").build();

    // ASSERT:
    expect(qualifiers).toBe(`language:javascript`);
  });

  test("Multiple qualifiers should be separated by an '+'", () => {
    // ACT:
    const qualifiers = new Qualifiers()
      .language("javascript")
      .language("C")
      .build();

    // ASSERT:
    expect(qualifiers).toBe(`language:javascript+language:C`);
  });
});
