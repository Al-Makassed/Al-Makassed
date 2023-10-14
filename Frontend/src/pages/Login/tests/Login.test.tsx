import React from "react";
import { screen } from "@testing-library/react";
import Login from "../Login";
import render from "src/tests/testRender";
// import { BrowserRouter } from "react-router-dom";

describe("Login Page", () => {
  it("should render the Login page", async () => {
    // Wrap your component with ViTestProvider
    render(<Login />);

    // // Use container to capture the visual snapshot
    expect(screen.getByText("Log In")).toBeInTheDocument();
  });
});
