import React, { FC } from "react";
import Typography from "@mui/material/Typography";
import { HomeContainer } from "./styled";

const Home: FC = () => {
  return (
    <HomeContainer>
      <Typography variant="h4">Welcome to Al-Maqasid</Typography>
    </HomeContainer>
  );
};

export default Home;
