import React from "react";
import Lottie from "lottie-react";
import { Stack, Typography } from "@mui/material";
import choose from "src/animation/choose.json";
import AddChapterButton from "./AddChapterButton";
import { useAppSelector } from "src/store/hooks";
import { selectIsManagerUser } from "src/features/user";

const Chapters = () => {
  const isManager = useAppSelector(selectIsManagerUser);

  return (
    <>
      <Stack sx={{ alignItems: "flex-end", pr: 3 }}>
        {isManager && <AddChapterButton />}
      </Stack>
      <Stack sx={{ alignItems: "center" }}>
        <Lottie animationData={choose} style={{ maxWidth: "400px" }} />
        <Typography
          variant="h1"
          sx={{ color: "grey.700" }}
          fontSize={{ xs: "h5.fontSize", md: "h4.fontSize", xl: "h5.fontSize" }}
          pb={{ md: 2 }}
          fontWeight={500}
        >
          Choose a Policy to be viewed
        </Typography>
      </Stack>
    </>
  );
};

export default Chapters;
