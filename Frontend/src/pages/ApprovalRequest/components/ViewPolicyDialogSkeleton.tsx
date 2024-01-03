import { Skeleton, Stack } from "@mui/material";
import React from "react";

const ViewPolicyDialogSkeleton = () => {
  return (
    <Stack display="flex" alignItems="center" gap={2.5}>
      <Skeleton
        variant="rounded"
        sx={{ borderRadius: 10 }}
        height={20}
        width={"50%"}
      />
    </Stack>
  );
};

export default ViewPolicyDialogSkeleton;
