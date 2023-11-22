import { FC } from "react";
import { Avatar, Grid } from "@mui/material";
import maqasidLogo from "../../../images/logo.jpg";

const LoginBackground: FC = () => {
  return (
    <Grid
      item
      xs={0}
      md={6}
      sx={{
        width: "100%",
        bgcolor: "primary.main",
        justifyContent: "center",
        alignItems: "center",
        display: {
          xs: "none",
          md: "flex",
        },
      }}
    >
      <Avatar
        alt="logo"
        variant="circular"
        sx={{
          width: 180,
          height: 180,
        }}
        src={maqasidLogo}
      />
    </Grid>
  );
};

export default LoginBackground;
