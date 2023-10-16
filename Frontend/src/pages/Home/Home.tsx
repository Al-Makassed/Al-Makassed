import React, { FC } from "react";
import Typography from "@mui/material/Typography";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";

const Home: FC = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Typography variant="h3">Welcome to Al-Maqasid</Typography>
    </>
  );
};

export default Home;
