import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

import HomePage from "../app/page";

vi.mock("@clerk/nextjs", () => {
  // Create an mockedFunctions object to match the functions we are importing from the @nextjs/clerk package in the ClerkComponent component.
  const mockedFunctions = {
    // this is wrong because   auth   doesn't return promise
    // it takes user from the cookie is my guess
    // desn't make any requests to clerk api
    /* auth: () =>
      new Promise((resolve) =>
        resolve({ userId: 'user_2NNEqL2nrIRdJ194ndJqAHwEfxC' })
      ), */
    auth: () => ({ userId: "user_2NNEqL2nrIRdJ194ndJqAHwEfxC" }),
    //
    ClerkProvider: ({ children }) => <div>{children}</div>,
    useUser: () => ({
      isSignedIn: true,
      user: {
        id: "user_2NNEqL2nrIRdJ194ndJqAHwEfxC",
        fullName: "Charles Harris",
      },
    }),
  };

  return mockedFunctions;
});

// I don't think I'm using fonts inside page component
// but this is how would I mock font

vi.mock("next/font/google", () => {
  return {
    Inter: () => ({ className: "inter" }),
  };
});

// test

test("Home", async () => {
  render(await Page());

  expect(
    screen.getByText(
      "Welcome to Feel-AI, the revolutionary journal app powered by artificial intelligence."
    )
  ).toBeTruthy();
});
