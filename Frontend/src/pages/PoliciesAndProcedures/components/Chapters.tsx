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
      <Stack sx={{ alignItems: "center", gap: 2 }}>
        {isManager && <AddChapterButton />}

        <Lottie animationData={choose} style={{ width: "500px" }} />
        <Typography
          variant="h3"
          sx={{ color: "grey.700" }}
          fontSize={{ xs: "h5.fontSize", md: "h4.fontSize", xl: "h5.fontSize" }}
          fontWeight={500}
        >
          Choose a Policy to be viewed
        </Typography>
      </Stack>
    </>
  );
};

export default Chapters;
