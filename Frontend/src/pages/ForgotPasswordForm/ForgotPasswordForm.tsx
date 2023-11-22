import React, { useState, FC, ChangeEvent, MouseEvent } from "react";
import {
  Avatar,
  Grid,
  TextField,
  Typography,
  Paper,
  Stack,
} from "@mui/material";
import LockResetIcon from "@mui/icons-material/LockReset";
import useForgetPasswordAPI from "./hooks/useForgotPasswordAPI";
import maqasidLogo from "../../images/logo.jpg";
import LoadingButton from "@mui/lab/LoadingButton";

const ForgetPassword: FC = () => {
  const [userId, setUserId] = useState<string>("");
  const { requestNewPassword, isPending } = useForgetPasswordAPI();
  const handleChangeUserId = (event: ChangeEvent<HTMLInputElement>) => {
    setUserId(event.target.value);
  };

  const handleSubmitForm = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    requestNewPassword(userId);
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
        width={{ xs: "350px", md: "500px" }}
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
          sx={{ width: 160, height: 160, display: { xs: "none", md: "flex" } }}
          src={maqasidLogo}
        />

        <Stack
          padding={{ xs: 2, md: 2 }}
          gap={2}
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
              color: "primary.main",
            }}
          >
            Forgot Password
          </Typography>
          <Stack gap={1}>
            <TextField
              variant="standard"
              margin="normal"
              fullWidth
              id="userId"
              label="User ID "
              autoComplete="userId"
              autoFocus
              placeholder="e.g. 202310408"
              value={userId}
              onChange={handleChangeUserId}
            />

            <LoadingButton
              loading={isPending}
              loadingPosition="start"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mb: 1.5 }}
              startIcon={<LockResetIcon />}
              aria-label="Forgot"
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

export default ForgetPassword;
