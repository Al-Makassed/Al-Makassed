import React, { FC } from "react";
import { Grid, Stack, Typography } from "@mui/material";

import FormsList from "./FormsList";
import PostersList from "./PostersList";
import ProtocolsList from "./ProtocolsList";

const EditDependencies: FC = () => {
  return (
    <Grid
    // paddingBottom={2}
    // sx={{
    //   justifyContent: "center",
    //   alignItems: "center",
    // }}
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
        <Stack spacing={5}>
          <FormsList />
          <PostersList />
          <ProtocolsList />
        </Stack>
      </Stack>
    </Grid>
  );
};

export default EditDependencies;
