import { Stack, Typography } from "@mui/material";
import Lottie from "lottie-react";
import { FC } from "react";
import emptyCategory from "src/animation/emptyCategory.json";

export interface EmptyListProps {
  label: string;
}

const EmptyList: FC<EmptyListProps> = ({ label }) => {
  return (
    <Stack alignItems="center" justifyContent="center" pb={4} px={5}>
      <Lottie animationData={emptyCategory} style={{ width: "150px" }} />
      <Typography variant="body1" textAlign="center">
        {label}
      </Typography>
    </Stack>
  );
};

export default EmptyList;
