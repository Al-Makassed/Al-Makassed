import React, { FC } from "react";
import { Skeleton, Stack } from "@mui/material";

const PolicyDetailsLoadingSkeleton: FC = () => {
  return (
    <Stack
      p={5}
      gap={3}
      width="100%"
      height="100vh"
      sx={{
        transition: "width 350ms ease-in-out",
      }}
    >
      <Stack direction="row" gap={1} alignItems="center">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} variant="rectangular" width={100} height={20} />
        ))}
      </Stack>
      <Skeleton variant="rounded" height={45} width={300} />
      <Skeleton variant="rounded" height={30} width="100%" />
      <Stack gap={2}>
        <Skeleton variant="rounded" height={30} width={100} />
        <Skeleton variant="rounded" height={30} width={200} />
      </Stack>
      <Stack gap={2}>
        <Skeleton variant="rounded" height={30} width={100} />
        <Skeleton variant="rounded" height={100} width="min(100%, 600px)" />
      </Stack>

      <Skeleton variant="rounded" height={30} width={200} />
    </Stack>
  );
};

export default PolicyDetailsLoadingSkeleton;
