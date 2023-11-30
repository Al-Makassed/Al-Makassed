import React, { FC } from "react";
import { Skeleton, Stack } from "@mui/material";

const SectionHeaderSkeleton: FC = () => {
  return (
    <Stack flexDirection={"row"} gap={1} mt={3}>
      <Skeleton variant="rounded" height={35} width={"25%"} />
      <Skeleton variant="rounded" height={2} width={"75%"} sx={{ mt: 2 }} />
    </Stack>
  );
};

export default SectionHeaderSkeleton;
