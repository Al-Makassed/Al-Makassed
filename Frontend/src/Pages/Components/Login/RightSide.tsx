import React from "react";
import * as yup from "yup";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const RightSide = () => {
  const schema = yup.object().shape({
    id: yup.string().required("Your ID is required!"),
    password: yup.string().required("Your password is required!"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [user, setUser] = React.useState<object>();

  const onSubmit = (data: object) => {
    console.log(data);
    setUser(data);
  };
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
          fontSize={{xs:"2em",sm:"3em"}}
          sx={{
            color: "secondary.main",
            
          }}
        >
          Log In
        </Typography>
        <Box
          //   onSubmitCapture={handleSubmit(onSubmit)}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 1 }}
        >
          <TextField
            color="secondary"
            variant="standard"
            margin="normal"
            required
            fullWidth
            id="id"
            label="User ID "
            // name="id"
            autoComplete="id"
            autoFocus
            // type="number"
            {...register("id")}
          />
          <Typography>{errors.id?.message}</Typography>

          <TextField
            color="secondary"
            variant="standard"
            margin="normal"
            required
            fullWidth
            // name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            {...register("password")}
          />
          <Typography>{errors.password?.message}</Typography>

          <FormControlLabel 
            control={<Checkbox value="remember" color="secondary" />}
            label="Remember me"
          />
          <Button
            color="secondary"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 9 }}
          >
            Log In
          </Button>
          <Grid container direction="column">
            <Grid item xs>
              <Link href="#" variant="body2" color="#5E5E5E">
                Forgot password?
              </Link>
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

export default RightSide;
