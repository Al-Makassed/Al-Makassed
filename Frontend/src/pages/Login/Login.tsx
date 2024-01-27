import React, { FC } from "react";
import Grid from "@mui/material/Grid";
import LoginBackground from "./components/LoginBackground";
import LoginForm from "./components/LoginForm";
import useMediaQuery from "src/hooks/useMediaQuery";

const LoginPage: FC = () => {
  const { isMobile } = useMediaQuery();

  return (
    <Grid container sx={{ height: "100vh" }}>
      {!isMobile && <LoginBackground />}
      <LoginForm />
    </Grid>
  );
};

export default LoginPage;
