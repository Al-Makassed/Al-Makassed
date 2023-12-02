import React, { FC } from "react";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { SectionHeaderProps } from "./types";

const SectionHeader: FC<SectionHeaderProps> = ({ title }) => {
  return (
    <Stack flexDirection={"row"} gap={1}>
      <Typography variant="h6">{title}</Typography>
      <Box
        width={"100%"}
        borderTop={2}
        mt={2}
        borderColor={(theme) => theme.palette.grey[200]}
      />
      <Divider />
    </Stack>
  );
};

export default SectionHeader;
