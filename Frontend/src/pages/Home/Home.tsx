import React, { FC } from "react";
import Typography from "@mui/material/Typography";
import { HomeContainer } from "./styled";
import { HomeProps } from "./types";

const Home: FC<HomeProps> = ({ userName }) => {
  return (
    <HomeContainer>
      <Typography variant="h4">
        Welcome {userName ?? ""} to Al-Maqasid
      </Typography>
    </HomeContainer>
  );
};

export default Home;
