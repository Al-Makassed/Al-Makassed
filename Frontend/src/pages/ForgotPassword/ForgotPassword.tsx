import React, { useState } from "react";
import { Avatar, Box, Grid, TextField, Typography, Paper } from "@mui/material";
import LockResetIcon from "@mui/icons-material/LockReset";
import useForgetPasswordAPI from "./hooks/useForgotPasswordAPI";
import maqasidLogo from "../../images/logo.jpg";
import LoadingButton from "@mui/lab/LoadingButton";

const ForgetPassword = () => {
  const [id, setId] = useState<string>("");
  const { newPassword, isPending } = useForgetPasswordAPI();
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setId(value);
  };
  const handleSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    newPassword(id);
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
            Forgot Password
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              color="success"
              variant="standard"
              margin="normal"
              fullWidth
              id="userId"
              label="User ID "
              autoComplete="userId"
              autoFocus
              placeholder="e.g. 202310408"
              value={id}
              onChange={onChange}
            />

            <LoadingButton
              loading={isPending}
              loadingPosition="start"
              color="success"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 1.5 }}
              startIcon={<LockResetIcon />}
              aria-label="Login"
            >
              Reset Password
            </LoadingButton>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ForgetPassword;
