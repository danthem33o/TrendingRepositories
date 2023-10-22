import { LocalStoragApi } from "./LocalStorageApi";

describe("LocalStorageApi", () => {
  const setItemSpy = jest.spyOn(Storage.prototype, "setItem");
  const getItemSpy = jest.spyOn(Storage.prototype, "getItem");

  beforeEach(() => {
    setItemSpy.mockReset();
    getItemSpy.mockReset();
    Storage.prototype.setItem = jest.fn();
    Storage.prototype.getItem = jest.fn();
  });

  describe("PUT", () => {
    test("Put adds data to local storage", () => {
      // ARRANGE:
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

    test("Put can add multiple favourites in storage", () => {
      // ARRANGE:
      let itemsInStorage: { ownerName: string; repoName: string }[] = [];

      Storage.prototype.setItem = (_, item) => {
        itemsInStorage = JSON.parse(item);
      };

      Storage.prototype.getItem = (_) => JSON.stringify(itemsInStorage);

      const localStorageApi = new LocalStoragApi();

      // ACT:
      localStorageApi.put("https://api.github.com/user/starred/Hello/World", {
        ownerName: "Hello",
        repoName: "World",
      });
      localStorageApi.put("https://api.github.com/user/starred/Hello/Again", {
        ownerName: "Hello",
        repoName: "Again",
      });

      // ASSERT:
      expect(Object.keys(itemsInStorage).length).toBe(2);
    });

    test("Put with star URL adds to local storage under 'favourites'", () => {
      // ARRANGE:
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
        JSON.stringify([
          {
            ownerName: "Hello",
            repoName: "World",
          },
        ])
      );
    });
  });

  describe("GET", () => {
    test("Get retrieves data from local storage", async () => {
      // ARRANGE:
      const expected = [
        {
          ownerName: "Hello",
          repoName: "World",
        },
      ];

      Storage.prototype.getItem = jest
        .fn()
        .mockReturnValue(JSON.stringify(expected));

      const localStorageApi = new LocalStoragApi();

      // ACT:
      const result = await localStorageApi.get("/get");

      // ASSERT:
      expect(result).toEqual({ data: expected });
    });

    test("Get retrieves favourited repositories from local storage", async () => {
      // ARRANGE:
      const expected = [
        {
          ownerName: "Hello",
          repoName: "World",
        },
      ];

      Storage.prototype.getItem = jest
        .fn()
        .mockReturnValue(JSON.stringify(expected));

      const localStorageApi = new LocalStoragApi();

      // ACT:
      const result = await localStorageApi.get(
        "https://api.github.com/user/starred"
      );

      // ASSERT:
      expect(result).toEqual({ data: expected });
    });
  });
});
