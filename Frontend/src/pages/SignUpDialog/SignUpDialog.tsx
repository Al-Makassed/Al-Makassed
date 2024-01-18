import KeyIcon from "@mui/icons-material/Key";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Grid, Stack } from "@mui/material";
import { FormikProvider } from "formik";
import { FC, useState } from "react";
import PasswordField from "src/components/Fields/PasswordField";
import TextField from "src/components/Fields/TextField";
import useSignUpForm from "./hooks/useSignUpForm";
import MaqasidDialog from "src/components/MaqasidDialog";
import AutocompleteField from "src/components/Fields/AutocompleteField";
import useGetDepartments from "../AddMonitoringToolDialog/hooks/useGetDepartments";
import { Department } from "../AddMonitoringToolDialog/API/types";
import { role } from "./constants";
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
          <MaqasidDialog.Close />
        </MaqasidDialog.Actions>
      </MaqasidDialog.Header>
      <Grid>
        <FormikProvider value={formikProps}>
          <MaqasidDialog.Body>
            <Stack gap={1} sx={{ width: "min(560px, 100%)" }}>
              <Box sx={{ minHeight: "80px" }}>
                <TextField
                  name="userId"
                  label="User Id"
                  placeholder="e.g. 202310408"
                  fullWidth
                />
              </Box>

              <Box sx={{ minHeight: "80px" }}>
                <TextField
                  name="userName"
                  label="User Name"
                  placeholder="e.g. Israa"
                  fullWidth
                />
              </Box>

              <Box sx={{ minHeight: "80px" }}>
                <TextField
                  name="fullName"
                  label="Full Name"
                  placeholder="e.g. Israa Zaher Yahya"
                  fullWidth
                />
              </Box>

              <Box sx={{ minHeight: "80px" }}>
                <AutocompleteField
                  name="departments"
                  label="Department Name"
                  disablePortal
                  id="departments-autocomplete"
                  options={departments}
                  getOptionLabel={(option) => (option as Department).name}
                  onChange={(event, value) => {
                    setFieldValue("departmentId", (value as Department).id);
                  }}
                />
              </Box>

              <Box sx={{ minHeight: "80px" }}>
                <TextField
                  name="email"
                  label="Email"
                  placeholder="e.g. israa@gmail.com"
                  fullWidth
                />
              </Box>

              <Box sx={{ minHeight: "80px" }}>
                <AutocompleteField
                  name="roles"
                  label="roles"
                  disablePortal
                  id="role-autocomplete"
                  options={role}
                  getOptionLabel={(option) => (option as Role).name}
                  onChange={(event, value) => {
                    setFieldValue("roles", [(value as Role).name]);
                  }}
                />
              </Box>

              <Box sx={{ minHeight: "80px" }}>
                <PasswordField label="Password" name="password" />
              </Box>
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
