import React, { FC } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { LoaderCellProps } from "./types";

const LoaderCell: FC<LoaderCellProps> = ({ size = 15, color = "primary" }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress size={size} color={color} />
    </Box>
  );
};

export default LoaderCell;
