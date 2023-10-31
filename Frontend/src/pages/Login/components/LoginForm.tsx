import React from "react";
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

const LoginForm = () => {
  const navigate = useNavigate();

  const { register, handleSubmitForm, errors } = useLogin();

  const goToForgotPassword = () => navigate("/forgot-password");

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
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
        <Box
          //onSubmitCapture={handleSubmit(onSubmit)}
          component="form"
          onSubmit={handleSubmitForm}
          sx={{ mt: 1 }}
        >
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
          {/* <TextField
            color="success"
            variant="standard"
            margin="normal"
            // required
            fullWidth
            // name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            {...register("password")}
          /> */}
          <Typography sx={{ color: "error.light" }}>
            {errors.password?.message}
          </Typography>

          <FormControlLabel
            sx={{ mt: 1.5 }}
            componentsProps={{
              typography: {
                color: "grey.700",
                // fontSize: "0.9rem",
              },
            }}
            control={<Checkbox value="remember" color="success" />}
            label="Remember me"
          />
          <Button
            color="success"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 1.5 }}
          >
            Log In
          </Button>
          <Grid container direction="column">
            <Grid
              item
              xs
              sx={{ display: "flex" }}
              alignItems="center"
              justifyContent="center"
            >
              {/*<Link href="#" variant="body2"*/}
              {/*      sx={{textDecoration: "none", color: "grey.700", fontSize: "1rem"}}>*/}
              {/*    Forgot password?*/}
              {/*</Link>*/}
              <Button
                variant="text"
                color="success"
                onClick={goToForgotPassword}
              >
                Forgot password?
              </Button>
            </Grid>
            {/* <Grid item>
              <Link href="#" variant="body2" color="#5E5E5E">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid> */}
          </Grid>
        </Box>
      </Box>
    </Grid>
  );
};

export default LoginForm;
