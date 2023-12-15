import React, { FC } from "react";
import { Box, Stack, Typography } from "@mui/material";
import Lottie from "lottie-react";
import finished from "../../../animation/finishedSubmissions.json";
import useMediaQuery from "src/hooks/useMediaQuery";

const FinishedSubmissions: FC = () => {
  const { isMobile } = useMediaQuery();

  return (
    <Stack
      alignItems={"center"}
      gap={2}
      m={"auto"}
      height={"70vh"}
      justifyContent={"center"}
    >
      <Box width={{ xs: "150px", sm: "300px" }}>
        <Lottie animationData={finished} style={{ width: "100%" }} />
      </Box>
      <Typography
        variant={isMobile ? "h6" : "h4"}
        justifyContent={"center"}
        sx={{ textAlign: "center", textAlignLast: "center", width: "70%" }}
      >
        You've Finished Your Submissions for This Month
      </Typography>
    </Stack>
  );
};

export default FinishedSubmissions;
