import { Box, Stack, Typography } from "@mui/material";
import Lottie from "lottie-react";
import { FC } from "react";
import useMediaQuery from "src/hooks/useMediaQuery";
import finished from "../../../animation/finishedSubmissions.json";

const FinishedSubmissions: FC = () => {
  const { isMobile } = useMediaQuery();

  return (
    <Stack
      alignItems="center"
      height="calc(100vh - 64px)"
      justifyContent="center"
    >
      <Box width={{ xs: "150px", sm: "300px" }}>
        <Lottie animationData={finished} style={{ width: "100%" }} />
      </Box>
      <Typography
        variant={isMobile ? "h6" : "h4"}
        justifyContent="center"
        sx={{ textAlign: "center", textAlignLast: "center", width: "70%" }}
      >
        You've Finished Your Submissions for This Month
      </Typography>
    </Stack>
  );
};

export default FinishedSubmissions;
