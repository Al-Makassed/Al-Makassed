import React, { FC, useState } from "react";
import {
  Avatar,
  Box,
  Button,
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
import LockResetIcon from "@mui/icons-material/LockReset";
import maqasidLogo from "../../images/logo.jpg";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import useResetPasswordAPI from "./hooks/useResetPasswordAPI";

const ResetPassword: FC = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  console.log(email);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPasswordConfirm = () =>
    setShowPasswordConfirm((show) => !show);
  const handleMouseDownPasswordConfirm = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };
  const { newResetPassword } = useResetPasswordAPI();
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPassword(value);
  };
  const onChangeConfirmPassword = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target;
    setConfirmPassword(value);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    newResetPassword({ password, confirmPassword, email, token });
    // // Clear the input fields
    // setPassword('');
    // setConfirmPassword('');
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
        component={Paper}
        item
        elevation={3}
        display="flex"
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <Avatar
          alt="logo"
          variant="circular"
          sx={{
            width: 180,
            height: 180,
          }}
          src={maqasidLogo}
        />
        <Box
          sx={{
            my: 6,
            mx: 13,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            component="h1"
            variant="h3"
            fontWeight={500}
            fontSize={{ xs: "1.8em", sm: "2.8em" }}
            sx={{
              color: (theme) => theme.palette.maqasid.primary,
            }}
          >
            Reset Password
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Stack>
              <FormControl
                sx={{ m: 1, width: "25ch" }}
                variant="standard"
                color="success"
              >
                <InputLabel htmlFor="standard-adornment-password">
                  Password
                </InputLabel>
                <Input
                  value={password}
                  onChange={onChangePassword}
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
                sx={{ m: 1, width: "25ch" }}
                variant="standard"
                color="success"
              >
                <InputLabel htmlFor="standard-adornment-password">
                  Confirm Password
                </InputLabel>
                <Input
                  value={confirmPassword}
                  onChange={onChangeConfirmPassword}
                  id="standard-adornment-password"
                  type={showPasswordConfirm ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPasswordConfirm}
                        onMouseDown={handleMouseDownPasswordConfirm}
                      >
                        {showPasswordConfirm ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>

              <Button
                color="success"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 1.5 }}
                startIcon={<LockResetIcon />}
                aria-label="Login"
              >
                Reset Password
              </Button>
            </Stack>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ResetPassword;
