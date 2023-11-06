import React, { FC } from "react";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Lottie from "lottie-react";
import notFound from "src/animation/404.json";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ReplayIcon from "@mui/icons-material/Replay";

const NotFound: FC = () => {
  const navigate = useNavigate();

  const goToHome = () => navigate("/me");
  const backToPreviousPage = () => navigate(-1);
  const reloadPage = () => navigate(0);

  return (
    <Grid
      container
      sx={{
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        bgcolor: "grey.100",
      }}
    >
      <Stack sx={{ alignItems: "center" }}>
        <Lottie animationData={notFound} />
        <Typography
          variant="h2"
          sx={{ color: "grey.700", mt: -5 }}
          fontSize={{ xs: "h4.fontSize", md: "h3.fontSize", xl: "h2.fontSize" }}
        >
          Oops! Page not found
        </Typography>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          sx={{ mt: 4 }}
        >
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={backToPreviousPage}
            size="large"
            variant="contained"
          >
            Back
          </Button>
          <Button
            startIcon={<HomeIcon />}
            onClick={goToHome}
            size="large"
            variant="outlined"
            color="info"
          >
            Home
          </Button>
          <Button
            startIcon={<ReplayIcon />}
            onClick={reloadPage}
            size="large"
            variant="outlined"
            color="info"
          >
            Reload
          </Button>
        </Stack>
      </Stack>
    </Grid>
  );
};

export default NotFound;
