import React from "react";
// import { screen } from "@testing-library/react";
import render from "src/tests/testRender";
import App from "./App";

describe("App", () => {
  it("should render the App", () => {
    render(<App />);
    // const message = screen.queryByText("Hello");
    // expect(message).toBeVisible();
  });
});
