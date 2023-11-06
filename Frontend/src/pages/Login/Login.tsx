import React, { FC } from "react";
import Grid from "@mui/material/Grid";
import LoginBackground from "./components/LoginBackground";
import LoginForm from "./components/LoginForm";
import { Navigate } from "react-router-dom";
import { ACCESS_TOKEN_KEY } from "src/constants/localStorage";

const Login: FC = () => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

  if (accessToken)
    return <Navigate to="/me" replace state={{ from: location.pathname }} />;

  return (
    <Grid maxWidth={{ xs: "800px", sm: "100%", height: "100vh" }} container>
      <LoginBackground />
      <LoginForm />
    </Grid>
  );
};

export default Login;
