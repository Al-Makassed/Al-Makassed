import { Skeleton, Stack } from "@mui/material";

const FieldsListSkeleton = () => {
  return (
    <>
      <Stack width={"100%"} spacing={-5} mt={-4}>
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} height={150} />
        ))}
      </Stack>
      <Skeleton height={70} width={"25%"} sx={{ ml: "auto" }} />
    </>
  );
};

export default FieldsListSkeleton;
