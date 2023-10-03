import React, { FC, PropsWithChildren } from "react";
import { ThemeProvider } from "@mui/material/styles";
import maqasidTheme from "./maqasidTheme";

const MaqasidThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  return <ThemeProvider theme={maqasidTheme}>{children}</ThemeProvider>;
};

export default MaqasidThemeProvider;
