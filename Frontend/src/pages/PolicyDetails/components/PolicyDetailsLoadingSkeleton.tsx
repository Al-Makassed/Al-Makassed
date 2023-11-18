import React, { FC } from "react";
import { Skeleton, Stack } from "@mui/material";

const PolicyDetailsLoadingSkeleton: FC = () => {
  return (
    <Stack
      sx={{
        width: "100%",
        height: "100vh",
        p: 3,
        justifyContent: "flex-start",
        alignItems: "center",
      }}
      gap={6}
    >
      <Stack gap={3} alignItems="center">
        <Skeleton variant="rectangular" height={20} width={100} />
        <Skeleton variant="rectangular" height={30} width={500} />
        <Skeleton variant="rectangular" height={20} width={100} />
      </Stack>
      <Stack direction="row" gap={5}>
        <Skeleton variant="rounded" height={50} width={300} />
        <Skeleton variant="rounded" height={50} width={300} />
        <Skeleton variant="rounded" height={50} width={300} />
      </Stack>
    </Stack>
  );
};

export default PolicyDetailsLoadingSkeleton;
