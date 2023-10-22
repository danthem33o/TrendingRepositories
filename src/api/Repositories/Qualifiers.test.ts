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
});
