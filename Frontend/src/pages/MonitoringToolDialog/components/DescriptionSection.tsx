import React, { FC } from "react";
import { Typography } from "@mui/material";
import { DescriptionSectionProps } from "../types";
import SectionHeader from "./SectionHeader";
import { FormikProvider } from "formik";
import useUpdateMonitoringToolForm from "../hooks/useUpdateMonitoringToolForm";
import TextField from "src/components/Fields/TextField";

const DescriptionSection: FC<DescriptionSectionProps> = ({
  monitoringTool,
  isEditingMode,
}) => {
  const { formikProps } = useUpdateMonitoringToolForm(monitoringTool);

  return (
    <>
      <SectionHeader title="Description" />

      {!isEditingMode ? (
        <Typography variant="body1" paragraph>
          {monitoringTool.description}
        </Typography>
      ) : (
        <FormikProvider value={formikProps}>
          <TextField
            name="description"
            label="Monitoring Tool Description"
            //placeholder="e.g. Monitoring Tool Ex."
          />
        </FormikProvider>
      )}
    </>
  );
};

export default DescriptionSection;
