import React from "react";
import EditPolicyForm from "./components/PoliciesList";
import EditDependencies from "./components/DependenciesList";
import { Grid, useTheme } from "@mui/material";

const EditPolicyAndDependencyForm = () => {
  const theme = useTheme();

  return (
    <Grid
      container
      sx={{
        height: (theme) => `calc(100vh - ${theme.mixins.toolbar.height}px)`,
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "grey.100",
        overflow: "auto",
        ...theme.mixins.niceScroll(),
      }}
    >
      <EditPolicyForm />
      <EditDependencies />
    </Grid>
  );
};

export default EditPolicyAndDependencyForm;
