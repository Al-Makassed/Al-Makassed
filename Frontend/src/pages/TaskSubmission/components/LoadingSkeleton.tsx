import React, { FC } from "react";
import { Skeleton, Stack, Typography } from "@mui/material";
import FieldsListSkeleton from "./FieldsListSkeleton";

const LoadingSkeleton: FC = () => {
  return (
    <Stack
      alignItems={"center"}
      sx={{ p: 4 }}
      width={{ xs: "100%", md: "70%" }}
      margin={"auto"}
      gap={3}
    >
      <Stack direction={"row"} justifyContent={"space-between"} width={"100%"}>
        <Typography variant="h3" width={"50%"}>
          <Skeleton />
        </Typography>
        <Typography variant="h6" width={"20%"} sx={{ mt: "auto" }}>
          <Skeleton />
        </Typography>
      </Stack>

      <Skeleton width={"100%"} />

      <FieldsListSkeleton />
    </Stack>
  );
};

export default LoadingSkeleton;
