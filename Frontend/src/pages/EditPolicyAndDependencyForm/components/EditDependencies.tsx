import React from "react";
import { Grid, Stack, Typography, useTheme } from "@mui/material";

import { useParams } from "react-router-dom";
import useGetPolicyByCode from "../hooks/useGetPolicyBYCode";

import EditForm from "./EditForm";
import EditPoster from "./EditPoster";
import EditProtocols from "./EditProtocols";

const EditDependencies = () => {
  const { code } = useParams();
  const theme = useTheme();

  const {
    policy,
    // isFetching
  } = useGetPolicyByCode(code ?? "");

  if (!policy) return <Typography variant="h1">Invalid Policy Code</Typography>;

  if (!policy) return <Typography variant="h1">Invalid Policy Code</Typography>;
  return (
    <Grid
      container
      sx={{
        height: (theme) => `calc(100vh - ${theme.mixins.toolbar.height}px)`,
        paddingRight: 4,
        paddingLeft: 4,
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "grey.100",
        overflow: "auto",
        ...theme.mixins.niceScroll(),
      }}
    >
      <Stack spacing={3} padding={6} width={500}>
        <Typography
          sx={{
            paddingTop: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          component="h1"
          variant="h4"
          fontWeight={600}
        >
          Policy Dependencies
        </Typography>
        {/* <Stack direction="row" spacing={5}> */}
        <EditForm />
        <EditPoster />
        <EditProtocols />
      </Stack>
      {/* </Stack> */}
    </Grid>
  );
};

export default EditDependencies;
