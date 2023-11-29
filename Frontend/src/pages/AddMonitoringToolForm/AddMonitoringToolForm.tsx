import { LoadingButton } from "@mui/lab";
import { Stack } from "@mui/material";
import { Form, FormikProvider } from "formik";
import React, { FC } from "react";
import TextField from "src/components/Fields/TextField";
import AddIcon from "@mui/icons-material/Add";
import useAddMonitoringToolForm from "./hooks/useAddMonitoringToolForm";
import FieldsTransferList from "./components/FieldsTransferList";

const AddMonitoringToolForm: FC = () => {
  const { formikProps, isAdding } = useAddMonitoringToolForm();

  const { dirty, isValid, resetForm, submitForm } = formikProps;

  const handleSubmitForm = async () => {
    await submitForm();
    resetForm();
  };
  return (
    <FormikProvider value={formikProps}>
      <Form>
        <Stack p={3} gap={2.5} justifyContent="center">
          <TextField
            name="name"
            label="Policy Name"
            placeholder="e.g. Hand Hygiene Policy"
          />

          <TextField
            name="summary"
            label="Summary"
            placeholder="e.g. Here goes the description"
          />

          <FieldsTransferList
          //  field={field}
          />
        </Stack>

        <LoadingButton
          onClick={handleSubmitForm}
          type="submit"
          disabled={!dirty || !isValid}
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          aria-label="Add MT"
          loading={isAdding}
          loadingPosition="start"
        >
          Add
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
};

export default AddMonitoringToolForm;
