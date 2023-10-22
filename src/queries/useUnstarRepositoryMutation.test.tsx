import * as ReactQuery from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { StarApi } from "../api/Stars/StarApi";
import { useUnstarRepositoryMutation } from "./useUnstarRepositoryMutation";

const client = new ReactQuery.QueryClient();
const TestComponent = () => {
  const mutation = useUnstarRepositoryMutation(() => ({}));

  const onClick = () =>
    mutation.mutate({ ownerName: "Hello", repoName: "World" });

  return (
    <div>
      <button onClick={onClick}>Button</button>
    </div>
  );
};

describe("useUnstarRepositoryMutation", () => {
  test("It unstars a repository", () => {
    // ARRANGE:
    const apiSpy = jest.spyOn(StarApi.prototype, "unstarARepository");

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
