import React, { FC, useState, ChangeEvent, MouseEvent } from "react";
import LockResetIcon from "@mui/icons-material/LockReset";
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
import maqasidLogo from "../../images/logo.jpg";
import useResetPasswordAPI from "./hooks/useResetPasswordAPI";
import { selectUser } from "src/features/user";
import { useAppSelector } from "src/store/hooks";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";

const ResetPassword: FC = () => {
  const { userId } = useAppSelector(selectUser);

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
        height: "100vh",
        bgcolor: "grey.100",
      }}
      display="flex"
      justifyContent="center"
      alignItems="center"
      xs={12}
    >
      <Grid
        width={{ xs: 350, md: 600 }}
        component={Paper}
        item
        elevation={3}
        display="flex"
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <Avatar
          sx={{
            width: 180,
            height: 180,
            display: { xs: "none", md: "flex" },
          }}
          alt="logo"
          variant="circular"
          src={maqasidLogo}
        />
        <Stack
          padding={{ xs: 3, md: 4 }} // responsive for all screen sizes
          gap={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            component="h1"
            variant="h3"
            fontWeight={500}
            fontSize={{ xs: "1.8em", sm: "2.3em" }}
          >
            Reset Password
          </Typography>
          <Stack gap={3}>
            <FormControl sx={{ width: "25ch" }} variant="standard">
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
            <FormControl sx={{ width: "25ch" }} variant="standard">
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

            <LoadingButton
              loading={isPending}
              loadingPosition="start"
              type="submit"
              fullWidth
              variant="contained"
              startIcon={<LockResetIcon />}
              aria-label="Reset Password"
              onClick={handleSubmitForm}
            >
              Reset Password
            </LoadingButton>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default ResetPassword;
