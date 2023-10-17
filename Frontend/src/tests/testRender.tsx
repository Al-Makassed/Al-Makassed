import React, { ReactElement, FC, PropsWithChildren } from "react";
import { render } from "@testing-library/react";
import { MaqasidRenderOptions } from "./types";
import ThemeProvider from "./ThemeProvider";
import { BrowserRouter } from "react-router-dom";

const AllProviders: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider>
      <BrowserRouter>{children}</BrowserRouter>
    </ThemeProvider>
  );
};

const testRender = (
  Component: ReactElement,
  options?: MaqasidRenderOptions,
) => {
  return render(Component, {
    wrapper: AllProviders,
    ...options,
  });
};

export default testRender;
