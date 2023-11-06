import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import LoginIcon from "@mui/icons-material/Login";

const LoginForm = () => {
  const navigate = useNavigate();

  const { register, handleSubmitForm, errors, isLoggingIn } = useLogin();

  const goToForgotPassword = () => navigate("/forgot-password");

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };
  // Declare a state variable to store the "remember me" status
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  // Handle the change event of the checkbox
  const handleRememberMeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRememberMe(event.target.checked);
  };
  return (
    <Grid
      display="flex"
      justifyContent="center"
      alignItems="center"
      item
      xs={12}
      sm={8}
      md={7}
      component={Paper}
      elevation={6}
      square
    >
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
          Login to Maqasid
        </Typography>
        <Box component="form" onSubmit={handleSubmitForm} sx={{ mt: 1 }}>
          <TextField
            color="success"
            variant="standard"
            margin="normal"
            // required
            fullWidth
            id="userId"
            label="User ID "
            // name="id"
            autoComplete="userId"
            autoFocus
            // type="number"
            {...register("userId")}
          />
          <Typography sx={{ color: "error.light" }}>
            {errors.userId?.message}
          </Typography>

          <FormControl
            sx={{ m: 1, width: "25ch" }}
            variant="standard"
            color="success"
          >
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              id="standard-adornment-password"
              type={showPassword ? "text" : "password"}
              {...register("password")}
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
          <Typography sx={{ color: "error.light" }}>
            {errors.password?.message}
          </Typography>

          <FormControlLabel
            sx={{ mt: 1.5 }}
            componentsProps={{
              typography: {
                color: "grey.700",
              },
            }}
            control={
              <Checkbox
                value="remember"
                color="success"
                onChange={handleRememberMeChange}
                checked={rememberMe}
              />
            }
            label="Remember me"
          />
          <LoadingButton
            color="success"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 1.5 }}
            startIcon={<LoginIcon />}
            aria-label="Login"
            loading={isLoggingIn}
            loadingPosition="start"
          >
            Log In
          </LoadingButton>
          <Grid container direction="column">
            <Grid
              item
              xs
              sx={{ display: "flex" }}
              alignItems="center"
              justifyContent="center"
            >
              <Button
                variant="text"
                color="success"
                onClick={goToForgotPassword}
              >
                Forgot password?
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Grid>
  );
};

export default LoginForm;
