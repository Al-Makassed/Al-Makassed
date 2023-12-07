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
import React, { FC } from "react";
import TextField from "src/components/Fields/TextField";
import AddIcon from "@mui/icons-material/Add";
import useAddMonitoringToolForm from "./hooks/useAddMonitoringToolForm";
import useGetField from "./hooks/useGetField";
// import useGetDepartment from "./hooks/useGetDepartment";
import Autocomplete from "src/components/Fields/Autocomplete";

const AddMonitoringToolForm: FC = () => {
  const { formikProps, isAdding } = useAddMonitoringToolForm();
  const { fields } = useGetField();
  // const { departments } = useGetDepartment();

  const { dirty, isValid, resetForm, submitForm } = formikProps;

  const handleSubmitForm = async () => {
    await submitForm();
    resetForm();
  };
  return (
    <FormikProvider value={formikProps}>
      <Form>
        <Stack p={3} gap={2.5} justifyContent="center" alignItems="center">
          <TextField name="name" label="MT Name" sx={{ maxWidth: 350 }} />

          <TextField
            name="description"
            label="Summary"
            placeholder="e.g. Here goes the description"
            sx={{ maxWidth: 350 }}
          />

          <Autocomplete
            sx={{ width: 350 }}
            name="departments"
            multiple
            options={top5Films}
            getOptionLabel={(option) => option.title}
            defaultValue={[top5Films[1]]}
            renderInput={(params) => (
              <TextField
                name="departmentsIdes"
                {...params}
                variant="standard"
                label="Departments"
                placeholder="choose departments"
              />
            )}
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

          <List
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
          </List>
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

const top5Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
];
