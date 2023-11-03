import React, { FC } from "react";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Lottie from "lottie-react";
import lock from "src/lotties/lock.json";

const AccessDenied: FC = () => {
  return (
    <Grid
      container
      sx={{
        justifyContent: "center",
        alignItems: "center",
        height: (theme) => `calc(100vh - ${theme.mixins.toolbar.height}px)`,
      }}
    >
      <Stack sx={{ alignItems: "center", gap: 1 }}>
        {/* <LockIcon color="disabled" sx={{ fontSize: 150 }} /> */}
        <Lottie
          animationData={lock}
          style={{ width: "300px", height: "300px" }}
        />
        <Typography variant="h3" sx={{ color: "grey.700" }}>
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
