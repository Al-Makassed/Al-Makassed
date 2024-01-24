import { Stack } from "@mui/material";
import Lottie from "lottie-react";
import { FC } from "react";
import searchInitial from "src/animation/searchInitial.json";

const SearchLottie: FC = () => {
  return (
    <Stack direction="row" p={0}>
      <Lottie animationData={searchInitial} style={{ maxWidth: "400px" }} />
      <Lottie
        animationData={searchInitial}
        style={{
          maxWidth: "400px",
          marginLeft: "-3em",
          transform: "scaleX(-1)",
        }}
      />
    </Stack>
  );
};

export default SearchLottie;
