import React, { FC } from "react";
import { HeaderTextFieldProps } from "../types";
import { FormikProvider } from "formik";
import { TextField } from "@mui/material";
import useUpdateMonitoringToolForm from "../hooks/useUpdateMonitoringToolForm";

const HeaderTextField: FC<HeaderTextFieldProps> = ({
  monitoringTool,
  //   isEditingMode,
}) => {
  const { formikProps } = useUpdateMonitoringToolForm(monitoringTool);
  return (
    <>
      <FormikProvider value={formikProps}>
        <TextField
          name="name"
          label="Monitoring Tool Name"
          //placeholder="e.g. Monitoring Tool Ex."
          fullWidth
          multiline
          value={monitoringTool.name}
        />
      </FormikProvider>
    </>
  );
};

export default HeaderTextField;
