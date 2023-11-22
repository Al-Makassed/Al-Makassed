import KeyIcon from "@mui/icons-material/Key";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { Form, FormikProvider } from "formik";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import PasswordField from "src/components/Fields/PasswordField";
import TextField from "src/components/Fields/TextField";
import useLoginForm from "../hooks/useLoginForm";

const LoginForm: FC = () => {
  const navigate = useNavigate();

  const formikProps = useLoginForm();

  const { submitForm, isSubmitting, dirty, isValid } = formikProps;

  const goToForgotPassword = () => navigate("/forgot-password");

  return (
    <Grid
      xs={12}
      md={6}
      sx={{
        bgcolor: "grey.100",
        width: "100%",
      }}
    >
      <FormikProvider value={formikProps}>
        <Form style={{ height: "100%" }}>
          <Stack
            alignItems="center"
            justifyContent="center"
            sx={{ p: 3, height: "100%" }}
          >
            <Stack alignItems="center" justifyContent="center">
              <Typography
                component="h1"
                variant="h3"
                fontWeight={500}
                fontSize={{ xs: "1.8em", sm: "2.8em" }}
              >
                Login
              </Typography>

              <Typography
                variant="subtitle1"
                sx={{ mt: 1, textAlign: "center" }}
                color="grey"
              >
                🩺 Al-Maqasid Platform, Your Gateway to Effortless Hospital
                Management 🚀
              </Typography>
            </Stack>

            <Stack gap={2} sx={{ mt: 5, width: "min(560px, 100%)" }}>
              <Box sx={{ minHeight: "80px" }}>
                <TextField
                  name="userId"
                  label="User Id"
                  placeholder="e.g. 202310408"
                  fullWidth
                />
              </Box>

              <Box sx={{ minHeight: "80px" }}>
                <PasswordField label="Password" name="password" />
              </Box>
            </Stack>

            <Stack gap={1.5} sx={{ mt: 3, width: "min(560px, 100%)" }}>
              <LoadingButton
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
                Log In
              </LoadingButton>

              <Button variant="text" onClick={goToForgotPassword} fullWidth>
                Forgot password?
              </Button>
            </Stack>
          </Stack>
        </Form>
      </FormikProvider>
    </Grid>
  );
};

export default LoginForm;
