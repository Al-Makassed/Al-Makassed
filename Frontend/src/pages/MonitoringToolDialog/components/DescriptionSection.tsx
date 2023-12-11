import React, { FC } from "react";
import { Typography } from "@mui/material";
import { DescriptionSectionProps } from "../types";
import SectionHeader from "./SectionHeader";
import useMonitoringToolDialogContext from "../context/useMonitoringToolDialogContext";

const DescriptionSection: FC<DescriptionSectionProps> = ({
  monitoringTool,
}) => {
  const {
    state: { isEditingMode },
  } = useMonitoringToolDialogContext();

  return (
    <>
      <SectionHeader title="Description" />

      {!isEditingMode ? (
        <Typography variant="body1" paragraph>
          {monitoringTool.description}
        </Typography>
      ) : (
        //  <FormikProvider>
        //   <TextField
        //     name="description"
        //     label="Monitoring Tool Description"
        //     multiline
        //     placeholder="e.g. Monitoring Tool Ex."
        // />
        // </FormikProvider>
        <></>
      )}
    </>
  );
};

export default DescriptionSection;
