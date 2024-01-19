import KeyIcon from "@mui/icons-material/Key";
import LoadingButton from "@mui/lab/LoadingButton";
import { Grid, Stack } from "@mui/material";
import { FormikProvider } from "formik";
import { FC, useState } from "react";
import AutocompleteField from "src/components/Fields/AutocompleteField";
import PasswordField from "src/components/Fields/PasswordField";
import TextField from "src/components/Fields/TextField";
import MaqasidDialog from "src/components/MaqasidDialog";
import { Department } from "../AddMonitoringToolDialog/API/types";
import useGetDepartments from "../AddMonitoringToolDialog/hooks/useGetDepartments";
import { roles } from "./constants";
import useSignUpForm from "./hooks/useSignUpForm";
import { Role } from "./types";

const SignUpDialog: FC = () => {
  const formikProps = useSignUpForm();

  const { submitForm, isSubmitting, dirty, isValid, setFieldValue } =
    formikProps;

  const [isOpen, setIsOpen] = useState(true);

  const { departments } = useGetDepartments();

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <MaqasidDialog isOpen={isOpen} onClose={handleClose} variant="right">
      <MaqasidDialog.Header>
        <MaqasidDialog.Title flex={1} title="Register User" />
        <MaqasidDialog.Actions>
          <MaqasidDialog.Fullscreen />
          <MaqasidDialog.Close />
        </MaqasidDialog.Actions>
      </MaqasidDialog.Header>
      <Grid>
        <FormikProvider value={formikProps}>
          <MaqasidDialog.Body niceScroll>
            <Stack gap={3} sx={{ width: "min(600px, 100%)" }}>
              <TextField
                name="userId"
                label="User Id"
                placeholder="e.g. 202310408"
                fullWidth
              />

              <TextField
                name="userName"
                label="User Name"
                placeholder="e.g. Israa"
                fullWidth
              />

              <Stack direction={"row"} justifyContent="space-between">
                <TextField
                  name="firstName"
                  label="First Name"
                  placeholder="e.g. Israa"
                  sx={{ width: "49%" }}
                />
                <TextField
                  name="lastName"
                  label="Last Name"
                  placeholder="e.g. Yahya"
                  sx={{ width: "49%" }}
                />
              </Stack>

              <AutocompleteField
                name="departments"
                label="Department"
                disablePortal
                id="departments-autocomplete"
                options={departments}
                getOptionLabel={(option) => (option as Department).name}
                onChange={(event, value) => {
                  setFieldValue("departmentId", (value as Department).id);
                }}
              />

              <AutocompleteField
                name="roles"
                label="ٌRoles"
                disablePortal
                id="roles-autocomplete"
                defaultValue={null}
                options={roles}
                getOptionLabel={(option) => (option as Role).name}
                onChange={(event, value) => {
                  setFieldValue("roles", value);
                }}
              />

              <TextField
                name="email"
                label="Email"
                placeholder="e.g. israa@gmail.com"
                fullWidth
              />

              <PasswordField label="Password" name="password" />
            </Stack>
          </MaqasidDialog.Body>

          <MaqasidDialog.Footer>
            <LoadingButton
              sx={{ mt: 1, mb: 1 }}
              type="submit"
              onClick={submitForm}
              disabled={!dirty || !isValid}
              fullWidth
              variant="contained"
              startIcon={<KeyIcon />}
              aria-label="Login"
              loading={isSubmitting}
              loadingPosition="start"
            >
              Sign Up
            </LoadingButton>
          </MaqasidDialog.Footer>
        </FormikProvider>
      </Grid>
    </MaqasidDialog>
  );
};

export default SignUpDialog;
