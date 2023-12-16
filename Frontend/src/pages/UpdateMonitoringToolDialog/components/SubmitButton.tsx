import React, { FC } from "react";
import { LoadingButton } from "@mui/lab";
import AddIcon from "@mui/icons-material/Add";
import useUpdateMonitoringToolForm from "../hooks/useUpdateMonitoringToolForm";
import { SubmitButtonProps } from "../types";

const SubmitButton: FC<SubmitButtonProps> = ({ monitoringTool }) => {
  const { formikProps, isPending } =
    useUpdateMonitoringToolForm(monitoringTool);

  const { submitForm } = formikProps;

  function handleSubmitForm(): void {
    submitForm();
  }

  return (
    <LoadingButton
      onClick={handleSubmitForm}
      type="submit"
      //disabled={!dirty || !isValid}
      variant="contained"
      color="primary"
      startIcon={<AddIcon />}
      aria-label="Add Field"
      loading={isPending}
      loadingPosition="start"
    >
      Add
    </LoadingButton>
  );
};

export default SubmitButton;
