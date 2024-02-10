import Stack from "@mui/material/Stack";
import { Form, useFormikContext } from "formik";
import { FC } from "react";
import AutocompleteField from "src/components/Fields/AutocompleteField";
import TextField from "src/components/Fields/TextField";
import TransferList from "src/components/TransferList";
import useGetDepartments from "./hooks/useGetDepartments";
import useGetFields from "./hooks/useGetFields";
import { AddMonitoringToolFormPayload } from "./types";
import { Department } from "./API/types";

const AddMonitoringToolForm: FC = () => {
  const { setFieldValue } = useFormikContext<AddMonitoringToolFormPayload>();

  const { fields } = useGetFields();

  const { departments } = useGetDepartments();

  return (
    <Form>
      <Stack gap={4}>
        <TextField name="name" label="Name" />

        <TextField
          name="description"
          label="Description"
          placeholder="e.g. Here goes the description"
          multiline
        />

        <AutocompleteField
          name="departments"
          label="Departments"
          multiple
          disablePortal
          id="departments-autocomplete"
          options={departments}
          getOptionLabel={(option) => (option as Department).name}
          onChange={(event, value) => {
            const values = value as Department[];
            const departmentsIds = values.map((item) => item.id);
            setFieldValue("departmentsIdes", departmentsIds);
          }}
        />

        <TransferList
          left={fields}
          getOptionLabel={(option) => option.content}
          loading={!fields || fields.length === 0}
          onTransfer={(left, right) => {
            const rightIds = right.map((item) => item.id);
            setFieldValue("fieldsIdes", rightIds);
          }}
        />
      </Stack>
    </Form>
  );
};

export default AddMonitoringToolForm;
