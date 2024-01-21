import { Skeleton, Stack } from "@mui/material";
import { FC } from "react";

const RectangularSkeleton: FC = () => {
  return (
    <Skeleton variant="rectangular" height={70} sx={{ borderRadius: "15px" }} />
  );
};

const SearchingSkeleton: FC = () => {
  return (
    <Stack gap={1.5}>
      {Array.from(Array(4)).map((index) => (
        <RectangularSkeleton key={index} />
      ))}
    </Stack>
  );
};

export default SearchingSkeleton;
