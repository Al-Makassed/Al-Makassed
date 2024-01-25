import { Visibility, VisibilityOff } from "@mui/icons-material";
import LockResetIcon from "@mui/icons-material/LockReset";
import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { ChangeEvent, FC, MouseEvent, useState } from "react";
import { selectUser } from "src/features/user";
import useMediaQuery from "src/hooks/useMediaQuery";
import { useAppSelector } from "src/store/hooks";
import maqasidLogo from "../../images/logo.jpg";
import useResetPasswordAPI from "./hooks/useResetPasswordAPI";

const ResetPassword: FC = () => {
  const { userId } = useAppSelector(selectUser);

  const { isMobile } = useMediaQuery();

  const [currentPassword, setCurrentPassword] = useState<string>("");

  const [newPassword, setNewPassword] = useState<string>("");

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleChangeNewPassword = (event: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(event.target.value);
  };
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleClickShowPasswordConfirm = () =>
    setShowNewPassword((show) => !show);

  const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentPassword(event.target.value);
  };

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseDownPasswordConfirm = (
    event: MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const { resetPassword, isPending } = useResetPasswordAPI();

  const handleSubmitForm = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    resetPassword({ userId, currentPassword, newPassword });
  };

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
            <FormControl
              sx={{ width: { xs: "20ch", md: "25ch" } }}
              variant="standard"
            >
              <InputLabel htmlFor="standard-adornment-password">
                Current Password
              </InputLabel>
              <Input
                value={currentPassword}
                onChange={handleChangePassword}
                id="standard-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

            <FormControl
              sx={{ width: { xs: "20ch", md: "25ch" } }}
              variant="standard"
            >
              <InputLabel htmlFor="standard-adornment-password">
                New Password
              </InputLabel>
              <Input
                value={newPassword}
                onChange={handleChangeNewPassword}
                id="standard-adornment-password"
                type={showNewPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPasswordConfirm}
                      onMouseDown={handleMouseDownPasswordConfirm}
                    >
                      {showNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Stack>

          <LoadingButton
            loading={isPending}
            loadingPosition="start"
            type="submit"
            fullWidth
            variant="contained"
            startIcon={<LockResetIcon />}
            aria-label="Reset Password"
            sx={{ mt: 3 }}
            onClick={handleSubmitForm}
          >
            Reset Password
          </LoadingButton>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default ResetPassword;
