import { FC } from "react";
import LockResetIcon from "@mui/icons-material/LockReset";
import { LoadingButton } from "@mui/lab";
import { Avatar, Grid, Paper, Stack, Typography } from "@mui/material";
import useMediaQuery from "src/hooks/useMediaQuery";
import maqasidLogo from "../../images/logo.jpg";
import useResetPasswordForm from "./hooks/useResetPasswordForm";
import PasswordField from "src/components/Fields/PasswordField";
import { FormikProvider } from "formik";
import useResetPasswordAPI from "./hooks/useResetPasswordAPI";

const ResetPassword: FC = () => {
  const { isMobile } = useMediaQuery();

  const formikProps = useResetPasswordForm();

  const { submitForm, dirty, isValid } = formikProps;
  const { isPending } = useResetPasswordAPI();
  return (
    <Grid
      container
      sx={{
        height: "calc(100vh - 64px)",
        bgcolor: "grey.100",
      }}
      display="flex"
      justifyContent="center"
      alignItems="center"
      xs={12}
    >
      <FormikProvider value={formikProps}>
        <Grid
          width={{ xs: "100vw", sm: 550 }}
          height={{ xs: "calc(100vh - 64px)", sm: "auto" }}
          component={Paper}
          item
          elevation={3}
          display="flex"
          alignItems="center"
          justifyContent="center"
          direction="column"
          pb={7}
          pt={{ xs: 0, sm: 2 }}
        >
          <Avatar
            sx={{
              width: 130,
              height: 130,
            }}
            alt="logo"
            variant="circular"
            src={maqasidLogo}
          />

          <Stack gap={1.75} alignItems="center">
            <Typography
              component="h1"
              variant={isMobile ? "h5" : "h4"}
              fontWeight={500}
            >
              Reset Password
            </Typography>
            <Stack gap={3}>
              <PasswordField
                variant="standard"
                label="Current Password"
                name="currentPassword"
              />

              <PasswordField
                variant="standard"
                label="New Password"
                name="newPassword"
              />
            </Stack>
            <LoadingButton
              type="submit"
              onClick={submitForm}
              disabled={!dirty || !isValid}
              fullWidth
              variant="contained"
              startIcon={<LockResetIcon />}
              aria-label="Reset Password"
              loading={isPending}
              loadingPosition="start"
            >
              Reset Password
            </LoadingButton>
          </Stack>
        </Grid>
      </FormikProvider>
    </Grid>
  );
};

export default ResetPassword;
