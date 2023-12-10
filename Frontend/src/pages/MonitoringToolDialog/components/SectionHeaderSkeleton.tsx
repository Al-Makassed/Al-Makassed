import React, { FC } from "react";
import { Skeleton, Stack, Typography } from "@mui/material";

const SectionHeaderSkeleton: FC = () => {
  return (
    <Stack flexDirection={"row"} gap={1} mt={3}>
      <Typography variant="h4" width={"25%"}>
        <Skeleton />
      </Typography>

      <Skeleton
        variant="rounded"
        height={1.38}
        width={"75%"}
        sx={{ mt: 2.5 }}
      />
    </Stack>
  );
};

export default SectionHeaderSkeleton;
