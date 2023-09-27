import React from "react";
import { Avatar, Grid } from "@mui/material";

const LeftSide = () => {
  return (
    <Grid
      item
      xs={false}
      sm={4}
      md={5}
      sx={{
        width:"100%",
        bgcolor: "secondary.main",
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Avatar
        alt="logo"
        variant="circular"
        sx={{
          width: 180,
          height: 180,
          mr: 3,
          ml: 3,
        }}
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSumhvx1L5IUbpV6bwdfo7u73YNxRWR4rn9w&usqp=CAU"
      />
    </Grid>
  );
};

export default LeftSide;
