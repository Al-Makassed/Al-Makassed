import React, { FC } from "react";
import Grid from "@mui/material/Grid";
import LoginBackground from "./components/LoginBackground";
import LoginForm from "./components/LoginForm";

const Login: FC = () => {
  return (
    <Grid maxWidth={{ xs: "300px", sm: "100%", height: "100vh" }} container>
      <LoginBackground />
      <LoginForm />
    </Grid>
  );
};

export default Login;
