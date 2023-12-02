import React, { FC } from "react";
import { SubmissionsSegmentProps } from "./types";
import { Box, Typography } from "@mui/material";

const SubmissionsSegment: FC<SubmissionsSegmentProps> = ({
  totalSubmissions,
}) => {
  return (
    <Typography
      variant="body1"
      component={"div"}
      sx={{ ml: { sm: "auto" } }}
      display={"flex"}
      alignItems={"center"}
      gap={1}
    >
      <Box color={"primary.main"}>{totalSubmissions}/14</Box>
      Submissions
    </Typography>
  );
};

export default SubmissionsSegment;
