import React from "react";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline, Grid, colors, createTheme } from "@mui/material";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";

const Login = () => {
  const defaultTheme = createTheme({
    palette: {
      secondary: {
        main: colors.green[900],
      },
    },
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid maxWidth={{xs:"300px",sm:"100%"}} container component="main">
        <CssBaseline />
        <LeftSide/>
        <RightSide/>
      </Grid>
    </ThemeProvider>
  );
};

export default Login;
