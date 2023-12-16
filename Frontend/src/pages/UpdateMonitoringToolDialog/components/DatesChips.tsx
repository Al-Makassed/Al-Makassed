import React, { FC } from "react";
import { Chip, Stack } from "@mui/material";
import UpdateIcon from "@mui/icons-material/Update";
import CreatedIcon from "@mui/icons-material/MoreTime";
import { DatesChipsProps } from "../types";
import { formatDate } from "src/utils";

const DatesChips: FC<DatesChipsProps> = ({ createdAt, lastModified }) => {
  const lastModifiedDate = lastModified && formatDate(lastModified);

  const createdAtDate = createdAt && formatDate(createdAt);
  console.log("DatesChips: createdAtDate:", createdAt);

  return (
    <Stack direction={{ sx: "column", md: "row" }} gap={1}>
      <Chip
        icon={<CreatedIcon />}
        label={`Created at: ${createdAtDate}`}
        variant="outlined"
        sx={{ mb: 2, width: "fit-content" }}
      />
      <Chip
        icon={<UpdateIcon />}
        label={`Last Modified: ${lastModifiedDate}`}
        variant="outlined"
        sx={{ mb: 2, width: "fit-content" }}
      />
    </Stack>
  );
};

export default DatesChips;
