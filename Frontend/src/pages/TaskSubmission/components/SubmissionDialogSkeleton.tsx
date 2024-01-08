import { Skeleton, Stack } from "@mui/material";
import { FC } from "react";

const SubmissionDialogSkeleton: FC = () => {
  return (
    <Stack>
      {Array.from(Array(6)).map((index) => (
        <Skeleton key={index} height={"70px"} />
      ))}
    </Stack>
  );
};

export default SubmissionDialogSkeleton;
