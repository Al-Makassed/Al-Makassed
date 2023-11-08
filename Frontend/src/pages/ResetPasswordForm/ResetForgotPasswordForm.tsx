import React, { FC, useState, ChangeEvent, MouseEvent } from "react";
import {
  Avatar,
  Button,
  FormControl,
  Grid,
  // Hidden,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import LockResetIcon from "@mui/icons-material/LockReset";
import maqasidLogo from "../../images/logo.jpg";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import useResetPasswordAPI from "./hooks/useResetPasswordAPI";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch } from "src/app/hooks";
import { showErrorSnackbar } from "src/features/snackbar";
import { useNavigate } from "react-router-dom";

const ResetForgotPasswordForm: FC = () => {
  const url = new URL(window.location.href);

  const email = url.searchParams.get("email") ?? "";

  const token = url.searchParams.get("token") ?? "";

  const encodedToken = encodeURI(token).replaceAll("%20", "+");

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleClickShowPasswordConfirm = () =>
    setShowPasswordConfirm((show) => !show);

  const handleMouseDownPasswordConfirm = (
    event: MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };
  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const { resetForgottenPassword, isPending } = useResetPasswordAPI();
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const handleChangeConfirmPassword = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setConfirmPassword(event.target.value);
  };
  const dispatch = useAppDispatch();

  const handleSubmitForm = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (password === confirmPassword) {
      resetForgottenPassword({
        password,
        email,
        token: encodedToken,
      });
      setPassword("");
      setConfirmPassword("");
    } else {
      dispatch(
        showErrorSnackbar({
          message: "Passwords & Confirm Password don't match",
        }),
      );
    }
  };
  const navigate = useNavigate();

  const goToLogIn = () => navigate("/login");

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
        {/* <Hidden smDown> */}
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
        {/* </Hidden> */}
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
            sx={{
              color: (theme) => theme.palette.maqasid.primary,
            }}
          >
            Reset Password
          </Typography>
          <Stack gap={3}>
            <FormControl
              sx={{ width: "25ch" }}
              variant="standard"
              color="success"
            >
              <InputLabel htmlFor="standard-adornment-password">
                Password
              </InputLabel>
              <Input
                value={password}
                onChange={handleChangePassword}
                id="standard-adornment-password"
                type={showPassword ? "text" : "password"}
                placeholder=" eg p@ssw0rd12#"
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
              sx={{ width: "25ch" }}
              variant="standard"
              color="success"
            >
              <InputLabel htmlFor="standard-adornment-password">
                Confirm Password
              </InputLabel>
              <Input
                value={confirmPassword}
                onChange={handleChangeConfirmPassword}
                id="standard-adornment-password"
                type={showPasswordConfirm ? "text" : "password"}
                placeholder=" eg p@ssw0rd12#"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPasswordConfirm}
                      onMouseDown={handleMouseDownPasswordConfirm}
                    >
                      {showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

            <LoadingButton
              loading={isPending}
              loadingPosition="start"
              color="success"
              type="submit"
              fullWidth
              variant="contained"
              startIcon={<LockResetIcon />}
              aria-label="Reset Password"
              onClick={handleSubmitForm}
            >
              Reset Password
            </LoadingButton>
            <Button variant="text" color="success" onClick={goToLogIn}>
              LogIn
            </Button>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default ResetForgotPasswordForm;
