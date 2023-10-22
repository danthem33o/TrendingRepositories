import { ApiClient } from "../types";
import { StarApi } from "./StarApi";

const ApiMock: ApiClient = {
  get: jest.fn(),
  put: jest.fn(),
};

describe("StarApi", () => {
  test("It can star a repository", () => {
    // ARRANGE:
    const starApi = new StarApi(ApiMock);
    const expectedOwnerName = "TheOwner";
    const expectedRepoName = "TheRepo";

    // ACT:
    starApi.starARepository(expectedOwnerName, expectedRepoName);

    // ASSERT:
    expect(ApiMock.put).toBeCalledTimes(1);
    expect(ApiMock.put).toBeCalledWith(
      encodeURI(
        `https://api.github.com/user/starred/${expectedOwnerName}/${expectedRepoName}`
      ),
      { ownerName: expectedOwnerName, repoName: expectedRepoName }
    );
  });
});
