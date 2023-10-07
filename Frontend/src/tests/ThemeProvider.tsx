import React, { FC, PropsWithChildren } from "react";
import MaqasidThemeProvider from "../styling/MaqasidThemeProvider";
import CssBaseline from "@mui/material/CssBaseline";

const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <MaqasidThemeProvider>
      <CssBaseline />
      {children}
    </MaqasidThemeProvider>
  );
};

export default ThemeProvider;
