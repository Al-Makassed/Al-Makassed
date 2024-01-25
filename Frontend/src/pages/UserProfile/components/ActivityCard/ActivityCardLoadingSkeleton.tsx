import { Box, Divider, Skeleton, Stack } from "@mui/material";
import { FC } from "react";

const ActivityCardLoadingSkeleton: FC = () => {
  return (
    <Stack gap={2}>
      <Box>
        <Skeleton
          variant="rounded"
          height={30}
          width={120}
          sx={{ display: "block", mt: 2, mb: 1 }}
        />

        <Divider />
      </Box>

      <Stack gap={2}>
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton
            key={index}
            variant="rounded"
            width={"min(100%, 367px)"}
            height={120}
            sx={{ display: "block" }}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default ActivityCardLoadingSkeleton;
