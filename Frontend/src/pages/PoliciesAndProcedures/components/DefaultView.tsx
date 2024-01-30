import { Stack, Typography } from "@mui/material";
import Lottie from "lottie-react";
import choose from "src/animation/choose.json";
import { selectIsManagerUser } from "src/features/user";
import { useAppSelector } from "src/store/hooks";
import AddChapterButton from "./AddChapterButton";

const DefaultView = () => {
  const isManager = useAppSelector(selectIsManagerUser);

  return (
    <Stack
      height="calc(100vh - 64px)"
      width="100%"
      sx={{
        transition: "width 200ms ease-in-out",
        p: 3,
      }}
      gap={1}
    >
      {isManager && <AddChapterButton />}

      <Stack
        sx={{
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Lottie
          animationData={choose}
          style={{
            width: "300px",
            height: "250px",
          }}
        />

        <Typography
          variant="h1"
          fontSize={{
            xs: "h6.fontSize",
            sm: "h5.fontSize",
          }}
          fontWeight={500}
          sx={{
            color: "grey.700",
            mt: -1.5,
          }}
        >
          Choose a Policy to be viewed
        </Typography>
      </Stack>
    </Stack>
  );
};

export default DefaultView;
