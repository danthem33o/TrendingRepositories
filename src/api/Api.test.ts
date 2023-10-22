import axios from "axios";
import { Api } from "./Api";

describe("Api", () => {
  test("basic get request", async () => {
    // ARRANGE:
    const axiosSpy = jest
      .spyOn(axios, "get")
      .mockReturnValue(
        new Promise((resolve) => resolve({ data: { hello: "world" } }))
      );

    // ACT:
    const response = await Api.get("/test/url");

    // ASSERT:
    expect(response.data).toEqual({ hello: "world" });
    expect(axiosSpy).toHaveBeenCalledTimes(1);
  });
});
