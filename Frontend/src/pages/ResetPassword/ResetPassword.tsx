import React, { useState } from "react"; //  { useState } // ,
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
  //   TextField,
  Typography,
} from "@mui/material";
import LockResetIcon from "@mui/icons-material/LockReset";
import Container from "@mui/material/Container";
import maqasidLogo from "../../images/logo.jpg";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const ResetPassword = () => {
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
  return (
    <Container maxWidth="md">
      <Grid
        marginTop="80px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        item
        component={Paper}
        elevation={6}
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
          <Stack
            component="form"
            //    onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
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
                id="standard-adornment-password"
                type={showPasswordConfirm ? "text" : "password"}
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
            {/* <TextField
            sx={{ m: 1, width: "25ch" }}
              color="success"
              variant="standard"
              margin="normal"
              fullWidth
              id="email"
              label="Email "
              autoComplete="Email"
              autoFocus
              required
              placeholder="Enter your Email"
                // value={id}
              //   onChange={onChange}
            /> */}

            <Button
              color="success"
              type="submit"
              //   fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 1.5 }}
              startIcon={<LockResetIcon />}
              aria-label="Login"
            >
              Reset Password
            </Button>
          </Stack>
        </Box>
      </Grid>
    </Container>
  );
};

export default ResetPassword;
