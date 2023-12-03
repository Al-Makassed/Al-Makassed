import React, { FC } from "react";
import { Stack, Typography } from "@mui/material";
import { HeaderProps } from "../../types";
import DescriptionSection from "./DescriptionSection";
import SubmissionsSegment from "./SubmissionsSegment";

const Header: FC<HeaderProps> = ({ focalPointTask }) => {
  return (
    <Stack gap={3} width={"100%"}>
      <Stack direction={{ xs: "column", sm: "row" }} alignItems={"center"}>
        <Typography component="h1" variant="h4">
          {focalPointTask.monitoringTool.name}
        </Typography>

        <SubmissionsSegment
          totalSubmissions={focalPointTask.totalSubmissions}
        />
      </Stack>

      <DescriptionSection
        description={focalPointTask.monitoringTool.description}
      />
    </Stack>
  );
};

export default Header;
