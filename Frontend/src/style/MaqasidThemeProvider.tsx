import React, { FC, PropsWithChildren } from "react";
import { ThemeProvider } from "@mui/material/styles";
import maqasidTheme from "./maqasidTheme";
import CssBaseline from "@mui/material/CssBaseline";

const MaqasidThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider theme={maqasidTheme}>
      {children}
      <CssBaseline />
    </ThemeProvider>
  );
};

export default MaqasidThemeProvider;
