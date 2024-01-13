import KeyIcon from "@mui/icons-material/Key";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Grid, Stack } from "@mui/material";
import { FormikProvider } from "formik";
import { FC, useState } from "react";
import PasswordField from "src/components/Fields/PasswordField";
import TextField from "src/components/Fields/TextField";
import useSignUpForm from "./hooks/useSignUpForm";
import MaqasidDialog from "src/components/MaqasidDialog";
import ArrayTextField from "src/components/Fields/ArrayTextField";

const SignUp: FC = () => {
  const formikProps = useSignUpForm();

  const { submitForm, isSubmitting, dirty, isValid } = formikProps;

  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <MaqasidDialog isOpen={isOpen} onClose={handleClose} variant="right">
      <MaqasidDialog.Header>
        <MaqasidDialog.Title
          flex={1}
          title="SignUp"
          subtitle="🩺 Al-Maqasid Platform, Your Gateway to Effortless Hospital
            Management 🚀"
        />
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
                <TextField
                  name="departmentId"
                  label="Department Id"
                  placeholder="e.g. 3232a08d-0327-4495-9a49-dfd03148ced6"
                  fullWidth
                />
              </Box>
              <Box sx={{ minHeight: "80px" }}>
                <TextField
                  name="email"
                  label="Email"
                  placeholder="e.g. Israad@gmail.com"
                  fullWidth
                />
              </Box>

              <Box sx={{ minHeight: "80px" }}>
                <ArrayTextField
                  name="roles"
                  label="Roles"
                  placeholder="e.g. staff,admin"
                  fullWidth
                  parse={(value) => (value ? value.split(",") : [])}
                  format={(value) => (value ? value.join(",") : "")}
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

export default SignUp;
