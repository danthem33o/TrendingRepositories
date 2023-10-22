import * as ReactQuery from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useStarRepositoryMutation } from "./useStarRepositoryMutation";
import { StarApi } from "../api/Stars/StarApi";

const client = new ReactQuery.QueryClient();
const TestComponent = () => {
  const mutation = useStarRepositoryMutation(() => ({}));

  const onClick = () =>
    mutation.mutate({ ownerName: "Hello", repoName: "World" });

  return (
    <div>
      <button onClick={onClick}>Button</button>
    </div>
  );
};

describe("useStarRepositoryMutation", () => {
  test("It stars a repository", () => {
    // ARRANGE:
    const apiSpy = jest.spyOn(StarApi.prototype, "starARepository");

    // ACT:
    render(
      <ReactQuery.QueryClientProvider client={client}>
        <TestComponent />
      </ReactQuery.QueryClientProvider>
    );

    fireEvent.click(screen.getByText("Button"));

    // ASSERT:
    // eslint-disable-next-line testing-library/await-async-utils
    waitFor(() => expect(apiSpy).toBeCalledWith("Hello", "World"));
  });
});
