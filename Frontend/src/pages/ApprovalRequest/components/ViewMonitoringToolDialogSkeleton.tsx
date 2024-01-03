import React from "react";
import { Skeleton, Stack } from "@mui/material";

const ViewMonitoringToolDialogSkeleton = () => {
  return (
    <Stack display="flex" alignItems="center" gap={2.5}>
      <Skeleton
        variant="rounded"
        sx={{ borderRadius: 10 }}
        height={20}
        width={"50%"}
      />

      <Skeleton
        variant="rounded"
        sx={{ borderRadius: 10 }}
        height={20}
        width={"50%"}
      />

      <Skeleton
        variant="rounded"
        sx={{ borderRadius: 10 }}
        height={20}
        width={"50%"}
      />

      <Skeleton
        variant="rounded"
        sx={{ borderRadius: 10 }}
        height={20}
        width={"50%"}
      />
    </Stack>
  );
};

export default ViewMonitoringToolDialogSkeleton;
