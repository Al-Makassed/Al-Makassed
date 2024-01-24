// UserColumn.tsx
import React from "react";
import { Stack, Typography } from "@mui/material";
import UserAvatar from "src/components/UserAvatar";
// import { getAvatarAbbreviation } from "src/utils/getAvatarAbbreviation";
import { ApprovalRequest } from "../API/Types";
import getAvatarAbbreviation from "src/utils/getAvatarAbbreviation";

const UserColumn: React.FC<{ row: ApprovalRequest }> = ({ row }) => (
  <Stack direction="row" alignItems="center" spacing={1}>
    <UserAvatar
      src={row.requesterAvatarUrl}
      initials={getAvatarAbbreviation(row.requesterUserName)}
    />
    <Typography>{row.requesterUserName}</Typography>
  </Stack>
);

export default UserColumn;
