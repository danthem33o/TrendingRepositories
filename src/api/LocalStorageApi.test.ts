import { LocalStoragApi } from "./LocalStorageApi";

describe("LocalStorageApi", () => {
  test("Put adds data to local storage", () => {
    // ARRANGE:
    jest.spyOn(Storage.prototype, "setItem");
    Storage.prototype.setItem = jest.fn();

    const localStorageApi = new LocalStoragApi();

    // ACT:
    localStorageApi.put("/test", { hello: "world" });

    // ASSERT:
    expect(localStorage.setItem).toBeCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "local",
      JSON.stringify({
        hello: "world",
      })
    );
  });

  test("Put with star URL adds to local storage under 'favourites'", () => {
    // ARRANGE:
    jest.spyOn(Storage.prototype, "setItem");
    Storage.prototype.setItem = jest.fn();

    const localStorageApi = new LocalStoragApi();

    // ACT:
    localStorageApi.put("https://api.github.com/user/starred/Hello/World", {
      ownerName: "Hello",
      repoName: "World",
    });

    // ASSERT:
    expect(localStorage.setItem).toBeCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "favourites",
      JSON.stringify({
        ownerName: "Hello",
        repoName: "World",
      })
    );
  });
});
