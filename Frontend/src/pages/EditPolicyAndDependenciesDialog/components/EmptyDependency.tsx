import { Stack, Typography } from "@mui/material";
import Lottie from "lottie-react";
import { FC } from "react";
import empty from "src/animation/empty.json";
import { EmptyDependencyProps } from "./types";

const EmptyDependency: FC<EmptyDependencyProps> = ({ type }) => {
  return (
    <Stack alignItems="center">
      <Lottie animationData={empty} style={{ width: "100px" }} />
      <Typography variant="body1">No {type}s added yet</Typography>
    </Stack>
  );
};

export default EmptyDependency;
