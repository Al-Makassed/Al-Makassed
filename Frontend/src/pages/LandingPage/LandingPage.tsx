import React, { FC } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Container } from "./styled";
import { useNavigate } from "react-router-dom";
import KeyIcon from "@mui/icons-material/Key";
import HomeIcon from "@mui/icons-material/Home";
import Stack from "@mui/material/Stack";

const LandingPage: FC = () => {
  const navigate = useNavigate();

  const goToLoginPage = () => navigate("/login");
  const goToHome = () => navigate("/me");

  return (
    <Container>
      <Typography variant="h4" fontWeight={500}>
        Public Landing Page 🚀
      </Typography>
      <Stack direction="row" gap={1}>
        <Button
          startIcon={<KeyIcon />}
          onClick={goToLoginPage}
          size="large"
          variant="contained"
          sx={{ mt: 3 }}
        >
          Login
        </Button>
        <Button
          startIcon={<HomeIcon />}
          onClick={goToHome}
          size="large"
          variant="outlined"
          sx={{ mt: 3 }}
        >
          Home
        </Button>
      </Stack>
    </Container>
  );
};

export default LandingPage;
