import React from "react";
import { Skeleton, Stack } from "@mui/material";

const FieldsListSkeleton = () => {
  return (
    <>
      <Stack width={"100%"} spacing={-7}>
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} height={220} />
        ))}
      </Stack>
      <Skeleton height={70} width={"25%"} sx={{ ml: "auto" }} />
    </>
  );
};

export default FieldsListSkeleton;
