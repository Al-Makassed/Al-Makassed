import React, { useState } from "react";
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import Container from "@mui/material/Container";
import useForgetPasswordAPI from "./hooks/useForgotPasswordAPI";

const ForgetPassword = () => {
  const [id, setId] = useState<string>("");
  const { newPassword } = useForgetPasswordAPI();
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setId(value);
  };
  const handleSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    newPassword(id);
  };
  return (
    <Container maxWidth="md">
      <Grid
        marginTop="40px"
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
              required
              placeholder="Enter your user ID"
              value={id}
              onChange={onChange}
            />

            <Button
              color="success"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 1.5 }}
              startIcon={<LoginIcon />}
              aria-label="Login"
            >
              Log In
            </Button>
          </Box>
        </Box>
      </Grid>
    </Container>
  );
};

export default ForgetPassword;
