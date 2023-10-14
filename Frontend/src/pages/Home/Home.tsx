import React, { FC } from "react";
import Typography from "@mui/material/Typography";
import Sidebar from "../Sidebar";

const Home: FC = () => {
  return (
    <>
      <Typography variant="h3">Welcome to Al-Maqasid</Typography>
      <Sidebar />
    </>
  );
};

export default Home;
