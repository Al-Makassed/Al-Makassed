import AddIcon from "@mui/icons-material/Add";
import { LoadingButton } from "@mui/lab";
import { Stack } from "@mui/material";
import { Form, FormikProvider } from "formik";
import { FC, useState } from "react";
import AutocompleteField from "src/components/Fields/AutocompleteField";
import TextField from "src/components/Fields/TextField";
import TransferList from "src/components/TransferList";
import { Department } from "./API/types";
import useAddMonitoringToolForm from "./hooks/useAddMonitoringToolForm";
import useGetDepartment from "./hooks/useGetDepartment";
import useGetFields from "./hooks/useGetFields";

const AddMonitoringToolForm: FC = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<
    Department[] | null
  >([]);

  const { formikProps, isAdding } = useAddMonitoringToolForm();

  const { fields } = useGetFields();
  const { departments } = useGetDepartment();

  const departmentsOptions = departments ?? [];

  const { dirty, isValid, resetForm, submitForm, setFieldValue } = formikProps;

  const handleSubmitForm = async () => {
    const departmentIds = selectedDepartment!.map(
      (department) => department.id,
    );
    setFieldValue("departmentsIdes", departmentIds);

    await submitForm();
    resetForm();
  };

  return (
    <FormikProvider value={formikProps}>
      <Form>
        <Stack p={3} gap={4}>
          <TextField name="name" label="MT Name" sx={{ width: 660, ml: 2.7 }} />

          <TextField
            name="description"
            label="Summary"
            placeholder="e.g. Here goes the description"
            sx={{ width: 660, ml: 2.7 }}
          />

          <AutocompleteField<Department>
            name="departmentsIdes"
            label="Departments"
            multiple
            disablePortal
            id="combo-box-demo1"
            options={departmentsOptions}
            getOptionLabel={(option) => (option as Department).name}
            sx={{ width: 660, ml: 2.7 }}
            onChange={(event, value) => {
              const selectedDepartment = value as Department[];
              setSelectedDepartment(selectedDepartment);
              setFieldValue("departmentsIdes", selectedDepartment);
            }}
          />

          <TransferList
            left={fields}
            getOptionLabel={(option) => option.content}
            loading={!fields || fields.length === 0}
            onTransfer={(right) => {
              const rightIds = right.map((item) => item.id);
              setFieldValue("fieldsIdes", rightIds);
            }}
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
          sx={{ ml: 5.5 }}
        >
          Add
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
};

export default AddMonitoringToolForm;
