import AddIcon from "@mui/icons-material/Add";
import { LoadingButton } from "@mui/lab";
import {
  Checkbox,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { Form, FormikProvider } from "formik";
import { FC } from "react";
import AutocompleteField from "src/components/Fields/AutocompleteField";
import TextField from "src/components/Fields/TextField";
import { Department } from "./API/types";
import useAddMonitoringToolForm from "./hooks/useAddMonitoringToolForm";
import useGetDepartment from "./hooks/useGetDepartment";
import useGetField from "./hooks/useGetField";
import TransferList from "src/components/TransferList";

const AddMonitoringToolForm: FC = () => {
  const { formikProps, isAdding } = useAddMonitoringToolForm();
  const { fields } = useGetField();
  const { departments } = useGetDepartment();

  const departmentsOptions = departments ?? [];

  const { dirty, isValid, resetForm, submitForm, setFieldValue, values } = formikProps;

  const handleSubmitForm = async () => {
    await submitForm();
    resetForm();
  };

  console.log(values);

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

          {/* <TextField
            name="departmentsIdes"
            label='Select department'
            select
            sx={{ width: 350 }}
            SelectProps={{
              multiple: true
            }}
            helperText='Please select the departments'
            value={selectedDepartments}
            onChange={handleChange}
          >
            {departments?.map((department: Department, index) => (
              <MenuItem key={index} value={department.name}>
                {department.name}
              </MenuItem>
            ))}
          </TextField>
          
        {/* Fields List ........... */}

          {/* <List
            sx={{
              maxHeight: 400,
              maxWidth: 350,
              position: "relative",
              overflow: "auto",
              border: "1px solid lightgrey",
            }}
          >
            <Typography variant="h6" textAlign="center">
              0/{fields?.length} Fields
            </Typography>
            <Divider sx={{ color: "red" }} />
            {fields?.map((field, index) => (
              <ListItem
                key={index}
                secondaryAction={<Checkbox edge="end" />}
                disablePadding
              >
                <ListItemButton>
                  <ListItemText id={field.fieldId} primary={field.content} />
                </ListItemButton>
              </ListItem>
            ))}
          </List> */}

          <TransferList leftTitle="Fields" rightTitle="Selected Fields" />
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
