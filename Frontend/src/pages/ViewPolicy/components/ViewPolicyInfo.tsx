import React, { FC } from "react";
import { Typography } from "@mui/material";
import { ViewPolicyProps } from "../types";

const ViewPolicyinfo: FC<ViewPolicyProps> = ({ policy }) => {
  return (
    <Typography
      fontWeight={600}
      sx={{ color: (theme) => theme.palette.text.primary }}
    >
      {policy.name}
    </Typography>
  );
};
export default ViewPolicyinfo;
