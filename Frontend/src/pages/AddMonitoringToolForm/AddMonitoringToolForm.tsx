import AddIcon from "@mui/icons-material/Add";
import { LoadingButton } from "@mui/lab";
import { Stack } from "@mui/material";
import { Form, FormikProvider } from "formik";
import { FC } from "react";
import AutocompleteField from "src/components/Fields/AutocompleteField";
import TextField from "src/components/Fields/TextField";
import TransferList from "src/components/TransferList";
import { Department } from "./API/types";
import useAddMonitoringToolForm from "./hooks/useAddMonitoringToolForm";
import useGetDepartment from "./hooks/useGetDepartment";
import useGetField from "./hooks/useGetField";

const AddMonitoringToolForm: FC = () => {
  const { formikProps, isAdding } = useAddMonitoringToolForm();
  const { fields } = useGetField();
  const { departments } = useGetDepartment();

  const departmentsOptions = departments ?? [];

  const { dirty, isValid, resetForm, submitForm, setFieldValue } = formikProps;

  const handleSubmitForm = async () => {
    await submitForm();
    resetForm();
  };

  const leftList = [
    { id: "1", label: "Field 1" },
    { id: "2", label: "Field 2" },
    { id: "3", label: "Field 3" },
  ];

  console.log(fields);

  return (
    <FormikProvider value={formikProps}>
      <Form>
        <Stack p={3} gap={2.5} justifyContent="center" alignItems="center">
          <TextField name="name" label="MT Name" />

          <TextField
            name="description"
            label="Summary"
            placeholder="e.g. Here goes the description"
          />

          <AutocompleteField<Department>
            name="departmentsIdes"
            label="Departments"
            multiple
            disablePortal
            id="combo-box-demo1"
            options={departmentsOptions}
            getOptionLabel={(option) => (option as Department).name}
            fullWidth
            onChange={(event, value) => {
              const values = value as Department[];
              setFieldValue("departmentsIdes", values);
            }}
          />

          <TransferList
            leftTitle="Fields"
            rightTitle="Selected Fields"
            left={leftList}
            // left={[
            //   { id: "1", content: "Field 1" },
            //   { id: "2", content: "Field 2" },
            //   { id: "3", content: "Field 3" },
            // ]}
            // getOptionLabel={(option) => (option as any).content}
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
