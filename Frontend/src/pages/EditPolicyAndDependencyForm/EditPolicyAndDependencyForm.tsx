import React from "react";
import EditPolicyForm from "./components/EditPolicyForm";
// import EditDependencies from "./components/EditDependencies";
// import { Grid, Stack, useTheme } from "@mui/material";

const EditPolicyAndDependencyForm = () => {
  // const theme = useTheme();

  return (
    // <Grid
    //   container
    //   sx={{
    //     height: (theme) => `calc(100vh - ${theme.mixins.toolbar.height}px)`,
    //     justifyContent: "center",
    //     alignItems: "center",
    //     bgcolor: "grey.100",
    //     overflow: "auto",
    //     ...theme.mixins.niceScroll(),
    //   }}
    // >
      // <Stack>
        <EditPolicyForm />
        // <EditDependencies />
      // </Stack>
    // </Grid>
  );
};

export default EditPolicyAndDependencyForm;
