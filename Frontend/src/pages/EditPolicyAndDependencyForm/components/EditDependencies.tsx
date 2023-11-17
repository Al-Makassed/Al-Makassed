import React from "react";
import { Grid, Stack, Typography } from "@mui/material";

import EditForm from "./EditForm";
import EditPoster from "./EditPoster";
import EditProtocols from "./EditProtocols";

const EditDependencies = () => {
  return (
    <Grid
      paddingBottom={2}
      sx={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack spacing={1}>
        <Typography
          sx={{
            paddingTop: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          component="h2"
          variant="h5"
          fontWeight={600}
        >
          Policy Dependencies
        </Typography>
        <Stack direction="row" spacing={5}>
          <EditForm />
          <EditPoster />
          <EditProtocols />
        </Stack>
      </Stack>
    </Grid>
  );
};

export default EditDependencies;
