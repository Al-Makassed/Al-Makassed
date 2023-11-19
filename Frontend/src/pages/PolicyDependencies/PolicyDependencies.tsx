import React, { FC } from "react";
import { Box } from "@mui/material";
import Dependencies from "./Components/Dependencies";

const PolicyDependencies: FC = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Dependencies />
    </Box>
  );
};

export default PolicyDependencies;
