import React, { FC } from "react";
import Grid from "@mui/material/Grid";
import LoginBackground from "./components/LoginBackground";
import LoginForm from "./components/LoginForm";

const LoginPage: FC = () => {
  return (
    <Grid container sx={{ height: "100vh" }}>
      <LoginBackground />
      <LoginForm />
    </Grid>
  );
};

export default LoginPage;
