import React, { FC } from "react";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Lottie from "lottie-react";
import lock from "src/animation/unauthenticated.json";

const AccessDenied: FC = () => {
  return (
    <Grid
      container
      sx={{
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        bgcolor: "grey.100",
      }}
    >
      <Stack sx={{ alignItems: "center", gap: 1 }}>
        <Lottie
          animationData={lock}
          style={{ width: "300px", height: "300px" }}
        />
        <Typography
          variant="h3"
          sx={{ color: "grey.700" }}
          fontSize={{ xs: "h5.fontSize", md: "h4.fontSize", xl: "h3.fontSize" }}
          fontWeight={500}
        >
          Additional Access Required
        </Typography>
        <Typography variant="body1" sx={{ color: "grey.700" }}>
          It seems you don&apos;t have access to this page. Please contact a
          system administrator if access is needed.
        </Typography>
      </Stack>
    </Grid>
  );
};

export default AccessDenied;
