import React, { FC } from "react";
import { Typography } from "@mui/material";
import { DescriptionSectionProps } from "./types";
import SectionHeader from "./SectionHeader";

const DescriptionSection: FC<DescriptionSectionProps> = ({ description }) => {
  return (
    <>
      <SectionHeader title="Description" />

      <Typography variant="body1" paragraph>
        {description}
      </Typography>
    </>
  );
};

export default DescriptionSection;
