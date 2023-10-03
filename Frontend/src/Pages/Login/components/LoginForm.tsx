import React from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";

const LoginForm = () => {
  const navigate = useNavigate();

  const { register, handleSubmitForm, errors } = useLogin();

  const goToForgotPassword = () => navigate("/forgot-password");

  return (
    <Grid item xs={12} sm={8} md={7} component={Paper} elevation={6} square>
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
          fontSize={{ xs: "2em", sm: "3em" }}
          sx={{
            color: (theme) => theme.palette.maqasid.primary,
          }}
        >
          Log In
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
            id="id"
            label="User ID "
            // name="id"
            autoComplete="id"
            autoFocus
            // type="number"
            {...register("id")}
          />
          <Typography sx={{ color: "error.light" }}>
            {errors.id?.message}
          </Typography>

          <TextField
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
          />
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
